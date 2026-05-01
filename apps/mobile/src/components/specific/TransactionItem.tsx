import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../ui';

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';

interface TransactionItemProps {
  id: string;
  merchantName: string;
  amount: number;
  currency?: string;
  status: TransactionStatus;
  date: Date;
  category?: string;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  merchantName,
  amount,
  currency = 'USD',
  status,
  date,
  category,
  onPress,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getStatusIcon = (transactionStatus: TransactionStatus) => {
    switch (transactionStatus) {
      case 'completed':
        return { name: 'checkmark-circle' as const, color: colors.success.DEFAULT };
      case 'pending':
        return { name: 'time' as const, color: colors.warning.DEFAULT };
      case 'failed':
        return { name: 'close-circle' as const, color: colors.error.DEFAULT };
      case 'refunded':
        return { name: 'arrow-undo' as const, color: colors.info.DEFAULT };
    }
  };

  const statusIcon = getStatusIcon(status);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: `${statusIcon.color}20` }]}>
        <Ionicons name={statusIcon.name} size={24} color={statusIcon.color} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.merchantName}>{merchantName}</Text>
        {category && <Text style={styles.category}>{category}</Text>}
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        <Badge variant={status} size="sm">
          {status}
        </Badge>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  merchantName: {
    color: colors.text.primary,
    fontSize: typography.body.default.fontSize,
    fontWeight: '600',
  },
  category: {
    color: colors.text.muted,
    fontSize: typography.body.small.fontSize,
    marginTop: 2,
  },
  date: {
    color: colors.text.muted,
    fontSize: typography.body.small.fontSize,
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    color: colors.text.primary,
    fontSize: typography.body.default.fontSize,
    fontWeight: '600',
    marginBottom: 4,
  },
});
