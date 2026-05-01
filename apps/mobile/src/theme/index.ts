/**
 * Palm2Pay Mobile App Theme
 * Design System - Dark Theme by Default
 */

export const colors = {
  // Primary Brand Colors
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Primary brand color
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  purple: {
    500: '#8B5CF6',
    600: '#7C3AED',
  },

  // Semantic Colors
  success: {
    light: '#34D399',
    DEFAULT: '#10B981',
    dark: '#059669',
  },
  error: {
    light: '#F87171',
    DEFAULT: '#EF4444',
    dark: '#DC2626',
  },
  warning: {
    light: '#FBBF24',
    DEFAULT: '#F59E0B',
    dark: '#D97706',
  },
  info: {
    light: '#60A5FA',
    DEFAULT: '#3B82F6',
    dark: '#2563EB',
  },

  // Neutral Colors (Dark Theme)
  background: {
    primary: '#1A1A2E',
    secondary: '#16162A',
    tertiary: '#0F0F1A',
  },
  surface: {
    primary: '#252542',
    secondary: '#2A2A4A',
    elevated: '#303050',
  },
  border: {
    default: '#33334A',
    light: '#44445A',
    dark: '#22223A',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B0',
    muted: '#666670',
    disabled: '#444444',
  },

  // Gradients
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    success: ['#10B981', '#6366F1'],
    dark: ['#1A1A2E', '#0F0F1A'],
    card: ['#252542', '#2A2A4A'],
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const typography = {
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  body: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
    },
    default: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
    },
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  button: {
    large: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '600' as const,
    },
    default: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600' as const,
    },
    small: {
      fontSize: 14,
      lineHeight: 16,
      fontWeight: '600' as const,
    },
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 } as const,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 } as const,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 } as const,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 } as const,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.indigo[500],
    shadowOffset: { width: 0, height: 0 } as const,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 0,
  },
};

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: [0.4, 0, 0.2, 1] as const,
    enter: [0, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
  },
};

export const sizes = {
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  avatar: {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
    '2xl': 120,
  },
  touchTarget: {
    min: 44,
    recommended: 48,
  },
};

// Export combined theme object
export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  animation,
  sizes,
};

export type Theme = typeof theme;
