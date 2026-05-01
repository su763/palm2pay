# Palm2Pay Frontend Implementation Guide

## Overview

This guide provides a step-by-step implementation plan for building the Palm2Pay frontend based on the PRD requirements.

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Setup Design System

**Location:** `apps/mobile/src/theme/` and `apps/merchant/src/lib/theme/`

Create the following files:

#### Mobile Theme (`apps/mobile/src/theme/index.ts`)
```typescript
export const colors = {
  // Primary
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Primary brand
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  // Semantic
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  // Neutral (Dark Theme)
  background: '#1A1A2E',
  surface: '#252542',
  border: '#33334A',
  textPrimary: '#FFFFFF',
  textSecondary: '#888888',
  textMuted: '#444444',
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

export const typography = {
  display: { fontSize: 36, lineHeight: 44, fontWeight: '700' },
  h1: { fontSize: 28, lineHeight: 36, fontWeight: '700' },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: '600' },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
};
```

#### Web Theme (`apps/merchant/src/lib/theme.ts`)
```typescript
export const colors = {
  // Same primary colors as mobile
  indigo: { /* ... */ },
  // Semantic
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  // Neutral (Light Theme)
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
};

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.1)',
  glow: '0 0 20px rgba(99,102,241,0.3)',
};
```

---

### 1.2 Create Reusable Components

#### Mobile Components (`apps/mobile/src/components/`)

**Button.tsx**
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing } from '../theme';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onPress,
  disabled = false,
  loading = false,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : colors.indigo[500]} />
      ) : (
        <>
          {icon && <>{icon} </>}
          <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.indigo[500],
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.indigo[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.error,
  },
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 36,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    height: 48,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    height: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: colors.indigo[500],
  },
  ghostText: {
    color: colors.indigo[500],
  },
  dangerText: {
    color: '#fff',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
});
```

**Card.tsx**
```typescript
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

type CardProps = {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
}) => {
  return (
    <View
      style={[
        styles.card,
        styles[variant],
        styles[`${padding}Padding`],
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
  },
  default: {
    backgroundColor: colors.surface,
  },
  elevated: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nonePadding: {
    padding: 0,
  },
  smPadding: {
    padding: spacing.sm,
  },
  mdPadding: {
    padding: spacing.md,
  },
  lgPadding: {
    padding: spacing.lg,
  },
});
```

**Input.tsx**
```typescript
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { Ionicons } from '@expo/vector-icons';

type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: keyof typeof Ionicons.glyphMap;
  editable?: boolean;
  multiline?: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType = 'default',
  icon,
  editable = true,
  multiline = false,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError, !editable && styles.inputDisabled]}>
        {icon && (
          <Ionicons name={icon} size={20} color={error ? colors.error : colors.textMuted} style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    paddingVertical: spacing.md,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
```

#### Web Components (`apps/merchant/src/components/ui/`)

Similar components for the web dashboard using Tailwind CSS and React.

---

## Phase 2: Mobile App Screens (Week 3-4)

### 2.1 Onboarding Flow

**Files to create:**
- `apps/mobile/src/screens/Onboarding/WelcomeScreen.tsx`
- `apps/mobile/src/screens/Onboarding/OnboardingStep1.tsx`
- `apps/mobile/src/screens/Onboarding/OnboardingStep2.tsx`
- `apps/mobile/src/screens/Onboarding/OnboardingStep3.tsx`
- `apps/mobile/src/navigation/OnboardingNavigator.tsx`

### 2.2 Enhanced Existing Screens

Update the following files with enhanced UI:
- `apps/mobile/src/screens/HomeScreen.tsx` - Add QR scanner, request money
- `apps/mobile/src/screens/PayScreen.tsx` - Add recent merchants, better amount display
- `apps/mobile/src/screens/PalmEnrollScreen.tsx` - Add security settings, template info
- `apps/mobile/src/screens/TransactionsScreen.tsx` - Add filters, search
- `apps/mobile/src/screens/ProfileScreen.tsx` - Add more settings sections

### 2.3 New Screens

**Files to create:**
- `apps/mobile/src/screens/MerchantLocatorScreen.tsx` - Map integration
- `apps/mobile/src/screens/SecuritySettingsScreen.tsx` - Security toggles
- `apps/mobile/src/screens/PaymentMethodsScreen.tsx` - Card/bank management
- `apps/mobile/src/screens/AnalyticsScreen.tsx` - Spending insights
- `apps/mobile/src/screens/TransactionDetailScreen.tsx` - Transaction details modal
- `apps/mobile/src/screens/Auth/ForgotPasswordScreen.tsx` - Password recovery

---

## Phase 3: Merchant Dashboard (Week 5-6)

### 3.1 Authentication Pages

**Files to create:**
- `apps/merchant/src/app/login/page.tsx`
- `apps/merchant/src/app/register/page.tsx`
- `apps/merchant/src/app/forgot-password/page.tsx`

### 3.2 Core Pages

**Files to create:**
- `apps/merchant/src/app/transactions/page.tsx` - Transaction list
- `apps/merchant/src/app/transactions/[id]/page.tsx` - Transaction detail
- `apps/merchant/src/app/analytics/page.tsx` - Analytics dashboard
- `apps/merchant/src/app/customers/page.tsx` - Customer list
- `apps/merchant/src/app/customers/[id]/page.tsx` - Customer profile
- `apps/merchant/src/app/hardware/page.tsx` - Hardware management
- `apps/merchant/src/app/hardware/[id]/page.tsx` - Device detail
- `apps/merchant/src/app/settings/page.tsx` - Settings
- `apps/merchant/src/app/reports/page.tsx` - Reports
- `apps/merchant/src/app/help/page.tsx` - Help center

### 3.3 Layout Components

**Files to create:**
- `apps/merchant/src/components/layout/Sidebar.tsx`
- `apps/merchant/src/components/layout/Header.tsx`
- `apps/merchant/src/components/layout/DashboardLayout.tsx`

---

## Phase 4: Integration & Polish (Week 7-8)

### 4.1 API Integration

Update API utilities to connect with backend endpoints:

**Mobile:** `apps/mobile/src/utils/api.ts`
**Merchant:** `apps/merchant/src/lib/api.ts`

### 4.2 State Management

**Mobile:** Zustand stores
**Merchant:** React Query + Zustand

### 4.3 Testing

- Unit tests for components
- Integration tests for flows
- E2E tests with Detox (mobile) and Playwright (web)

---

## Required Dependencies

### Mobile (React Native)
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.0",
    "expo": "~50.0.0",
    "expo-camera": "~14.0.0",
    "expo-image-picker": "~14.0.0",
    "@react-navigation/native": "^6.0.0",
    "@react-navigation/bottom-tabs": "^6.0.0",
    "@react-navigation/stack": "^6.0.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0",
    "react-native-maps": "^1.0.0",
    "react-native-svg": "^14.0.0",
    "lottie-react-native": "^6.0.0"
  }
}
```

### Merchant (Next.js)
```json
{
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.300.0",
    "qrcode.react": "^3.0.0",
    "date-fns": "^3.0.0"
  }
}
```

---

## File Structure

```
palm2pay/
├── apps/
│   ├── mobile/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   └── ...
│   │   │   │   └── specific/
│   │   │   ├── screens/
│   │   │   │   ├── Onboarding/
│   │   │   │   ├── Auth/
│   │   │   │   └── ...
│   │   │   ├── navigation/
│   │   │   ├── store/
│   │   │   ├── theme/
│   │   │   └── utils/
│   │   └── ...
│   └── merchant/
│       ├── src/
│       │   ├── app/
│       │   │   ├── (dashboard)/
│       │   │   ├── login/
│       │   │   └── ...
│       │   ├── components/
│       │   │   ├── ui/
│       │   │   ├── layout/
│       │   │   ├── charts/
│       │   │   └── specific/
│       │   ├── lib/
│       │   └── ...
│       └── ...
├── packages/
│   ├── api/
│   └── biometric/
└── design-system/
    ├── DESIGN_TOKENS.md
    ├── MOBILE_APP_UI.md
    └── MERCHANT_DASHBOARD_UI.md
```

---

## Next Steps

1. **Review the design documentation** in `design-system/` folder
2. **Start with Phase 1** - Set up theme and components
3. **Implement mobile onboarding** - First user experience
4. **Enhance existing screens** - Build on current foundation
5. **Build merchant dashboard** - Parallel track with backend

---

## Contact

For questions about the frontend implementation, reach out to the frontend team lead or refer to the design documentation.
