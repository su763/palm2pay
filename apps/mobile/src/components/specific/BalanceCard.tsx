import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing, typography, shadows } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface BalanceCardProps {
  balance: number;
  currency?: string;
  onAddMoney?: () => void;
  onSend?: () => void;
  onRequest?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  currency = 'USD',
  onAddMoney,
  onSend,
  onRequest,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceLabel}>Available Balance</Text>
      <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>

      <View style={styles.actionsContainer}>
        {onAddMoney && (
          <TouchableOpacity style={styles.action} onPress={onAddMoney}>
            <View style={[styles.actionIcon, styles.addIcon]}>
              <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Add Money</Text>
          </TouchableOpacity>
        )}

        {onSend && (
          <TouchableOpacity style={styles.action} onPress={onSend}>
            <View style={[styles.actionIcon, styles.sendIcon]}>
              <Ionicons name="arrow-up-circle" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
        )}

        {onRequest && (
          <TouchableOpacity style={styles.action} onPress={onRequest}>
            <View style={[styles.actionIcon, styles.requestIcon]}>
              <Ionicons name="arrow-down-circle" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Request</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.indigo[500],
    borderRadius: borderRadius['2xl'],
    padding: spacing.xl,
    ...shadows.lg,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.body.small.fontSize,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.xl,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sendIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  requestIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: typography.body.small.fontSize,
    fontWeight: '600',
  },
});
