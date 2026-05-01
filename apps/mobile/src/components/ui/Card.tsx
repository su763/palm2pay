import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../../theme';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'gradient';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  rounded = false,
  style,
  onPress,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.card,
        styles[variant],
        styles[`${padding}Padding`],
        rounded && styles.rounded,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </CardComponent>
  );
};

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface.primary,
  },
  default: {
    backgroundColor: colors.surface.primary,
  },
  elevated: {
    backgroundColor: colors.surface.primary,
    ...shadows.lg,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  gradient: {
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.indigo[500],
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
  xlPadding: {
    padding: spacing.xl,
  },
  rounded: {
    borderRadius: borderRadius.xl,
  },
});
