import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'indigo';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  style,
}) => {
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

  return (
    <View style={[styles.badge, styles[variant], styles[size], style]}>
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={styles[`${variant}Text`].color}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: borderRadius.full,
  },
  default: {
    backgroundColor: colors.surface.secondary,
  },
  success: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  warning: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  info: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  indigo: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  sm: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    minHeight: 20,
  },
  md: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 24,
  },
  lg: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 28,
  },
  text: {
    fontWeight: '600',
  },
  defaultText: {
    color: colors.text.secondary,
  },
  successText: {
    color: colors.success.DEFAULT,
  },
  errorText: {
    color: colors.error.DEFAULT,
  },
  warningText: {
    color: colors.warning.DEFAULT,
  },
  infoText: {
    color: colors.info.DEFAULT,
  },
  indigoText: {
    color: colors.indigo[500],
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 12,
  },
  lgText: {
    fontSize: 14,
  },
  icon: {
    marginRight: 4,
  },
});
