import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Refresh data
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user?.fullName || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>$2,450.00</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.balanceAction}>
            <Ionicons name="add-circle" size={24} color="#6366f1" />
            <Text style={styles.balanceActionText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.balanceAction}>
            <Ionicons name="arrow-up-circle" size={24} color="#6366f1" />
            <Text style={styles.balanceActionText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#6366f1' }]}>
              <Ionicons name="scan" size={24} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Scan to Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#10b981' }]}>
              <Ionicons name="card" size={24} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#f59e0b' }]}>
              <Ionicons name="receipt" size={24} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Receipts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#ef4444' }]}>
              <Ionicons name="bar-chart" size={24} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Palm Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Palm Payment Status</Text>
        <View style={styles.palmStatusCard}>
          <View style={styles.palmStatusHeader}>
            <Ionicons
              name={user?.palmEnrolled ? 'checkmark-circle' : 'close-circle'}
              size={32}
              color={user?.palmEnrolled ? '#10b981' : '#ef4444'}
            />
            <Text style={styles.palmStatusText}>
              {user?.palmEnrolled ? 'Palm Enrolled' : 'Not Enrolled'}
            </Text>
          </View>
          <Text style={styles.palmStatusDescription}>
            {user?.palmEnrolled
              ? 'You can pay with your palm at any Palm2Pay terminal'
              : 'Enroll your palm to enable biometric payments'}
          </Text>
          {!user?.palmEnrolled && (
            <TouchableOpacity style={styles.enrollButton}>
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Recent Transactions Preview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyTransactions}>
          <Ionicons name="receipt-outline" size={48} color="#444" />
          <Text style={styles.emptyTransactionsText}>No recent transactions</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    color: '#888',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  balanceCard: {
    backgroundColor: '#6366f1',
    margin: 20,
    borderRadius: 20,
    padding: 24,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  balanceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#6366f1',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    color: '#888',
    fontSize: 12,
  },
  palmStatusCard: {
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 20,
  },
  palmStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  palmStatusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  palmStatusDescription: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
  enrollButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyTransactions: {
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyTransactionsText: {
    color: '#666',
    fontSize: 14,
    marginTop: 12,
  },
});
