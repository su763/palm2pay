/**
 * Palm2Pay Merchant Dashboard Theme
 * Design System - Light Theme
 */

export const colors = {
  // Primary Brand Colors (same as mobile for consistency)
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  purple: {
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
  },

  // Semantic Colors
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },

  // Neutral Colors (Light Theme)
  background: {
    primary: '#F8FAFC',
    secondary: '#F1F5F9',
    tertiary: '#E2E8F0',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    elevated: '#FFFFFF',
  },
  border: {
    default: '#E2E8F0',
    light: '#F1F5F9',
    dark: '#CBD5E1',
  },
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    muted: '#94A3B8',
    disabled: '#CBD5E1',
    inverse: '#FFFFFF',
  },

  // Sidebar
  sidebar: {
    background: '#1E293B',
    hover: '#334155',
    active: '#6366F1',
    text: '#94A3B8',
    textActive: '#FFFFFF',
  },

  // Gradients
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    success: ['#10B981', '#059669'],
    stats: ['#6366F1', '#8B5CF6', '#A78BFA'],
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const borderRadius = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem', // 32px
  '4xl': '2.5rem', // 40px
  '5xl': '3rem', // 48px
  '6xl': '4rem', // 64px
};

export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'JetBrains Mono, "Fira Code", monospace',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

export const breakpoints = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1440px',
};

export const layout = {
  sidebar: {
    width: '280px',
    collapsedWidth: '80px',
  },
  header: {
    height: '72px',
  },
  content: {
    maxWidth: '1440px',
    padding: '24px',
  },
};

export const transitions = {
  fast: '150ms ease',
  normal: '300ms ease',
  slow: '500ms ease',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// Export combined theme object
export const theme = {
  colors,
  shadows,
  borderRadius,
  spacing,
  typography,
  breakpoints,
  layout,
  transitions,
};

export type Theme = typeof theme;
