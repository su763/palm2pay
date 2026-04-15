import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { api } from '../utils/api';

interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  palmEnrolled: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, phoneNumber?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const TOKEN_KEY = 'palm2pay_tokens';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, accessToken, refreshToken } = response.data;

      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);

      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, fullName: string, phoneNumber?: string) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        fullName,
        phoneNumber,
      });
      const { user, accessToken, refreshToken } = response.data;

      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);

      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      const { accessToken } = get();
      if (accessToken) {
        await api.post('/auth/logout', null, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    }
  },

  refreshTokens: async () => {
    try {
      const { refreshToken } = get();
      if (!refreshToken) throw new Error('No refresh token');

      const response = await api.post('/auth/refresh', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', newRefreshToken);

      set({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      console.error('Token refresh failed:', error);
      await get().logout();
      throw error;
    }
  },

  updateUser: (user: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    }));
  },
}));

// Initialize auth state on app start
export const initializeAuth = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    if (accessToken && refreshToken) {
      // Verify token is still valid
      const response = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      useAuthStore.getState().login = async () => {}; // Prevent calling
      useAuthStore.setState({
        user: response.data,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      useAuthStore.setState({ isLoading: false });
    }
  } catch (error) {
    console.error('Auth initialization error:', error);
    useAuthStore.setState({ isLoading: false });
  }
};
