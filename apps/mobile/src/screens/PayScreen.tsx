import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../utils/api';

export default function PayScreen() {
  const [amount, setAmount] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handlePay = async () => {
    if (!amount || !merchantId) {
      Alert.alert('Error', 'Please enter amount and merchant ID');
      return;
    }

    setIsProcessing(true);

    try {
      // Initiate payment
      const initiateResponse = await api.post('/payments/initiate', {
        amount: parseFloat(amount),
        currency: 'USD',
        merchantId,
      });

      const { transactionId } = initiateResponse.data;

      // In a real implementation, this would trigger the palm scanner
      // For now, we'll simulate the verification
      Alert.alert(
        'Verify Payment',
        'Please hover your palm over the scanner to verify this payment.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'I\'ve Scanned',
            onPress: async () => {
              try {
                // Verify payment with biometric
                const verifyResponse = await api.post('/payments/verify', {
                  transactionId,
                  palmScanData: 'simulated-scan-data',
                });

                if (verifyResponse.data.success) {
                  Alert.alert('Success!', 'Payment completed successfully');
                  setAmount('');
                  setMerchantId('');
                } else {
                  Alert.alert('Error', 'Payment verification failed');
                }
              } catch (error: any) {
                Alert.alert(
                  'Error',
                  error.response?.data?.error || 'Verification failed'
                );
              } finally {
                setIsProcessing(false);
              }
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to initiate payment'
      );
      setIsProcessing(false);
    }
  };

  const quickAmounts = [5, 10, 20, 50];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Make a Payment</Text>
        <Text style={styles.subtitle}>
          Pay securely with your palm
        </Text>
      </View>

      {/* Amount Card */}
      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor="#666"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Quick Amounts */}
        <View style={styles.quickAmounts}>
          {quickAmounts.map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={styles.quickAmountButton}
              onPress={() => setAmount(quickAmount.toString())}
            >
              <Text style={styles.quickAmountText}>${quickAmount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Merchant ID */}
      <View style={styles.merchantCard}>
        <Text style={styles.label}>Merchant ID</Text>
        <View style={styles.merchantInputContainer}>
          <TextInput
            style={styles.merchantInput}
            value={merchantId}
            onChangeText={setMerchantId}
            placeholder="Enter merchant ID or scan QR"
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.scanButton}>
            <Ionicons name="scan" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.paymentMethodCard}>
        <View style={styles.paymentMethodHeader}>
          <Text style={styles.label}>Payment Method</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentMethod}>
          <Ionicons name="card" size={32} color="#6366f1" />
          <View style={styles.paymentMethodDetails}>
            <Text style={styles.paymentMethodName}>Default Card</Text>
            <Text style={styles.paymentMethodNumber}>•••• 4242</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={[
          styles.payButton,
          (!amount || !merchantId || isProcessing) && styles.payButtonDisabled,
        ]}
        onPress={handlePay}
        disabled={!amount || !merchantId || isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="hand-left" size={24} color="#fff" />
            <Text style={styles.payButtonText}>Pay with Palm</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Security Notice */}
      <View style={styles.securityNotice}>
        <Ionicons name="shield-checkmark" size={16} color="#10b981" />
        <Text style={styles.securityNoticeText}>
          Your payment is secured with biometric verification
        </Text>
      </View>

      {/* How it works */}
      <View style={styles.howItWorks}>
        <Text style={styles.howItWorksTitle}>How it works</Text>
        <View style={styles.steps}>
          <View style={styles.step}>
            <View style={styles.stepDot}>
              <Text style={styles.stepDotText}>1</Text>
            </View>
            <Text style={styles.stepText}>Enter amount</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepDot}>
              <Text style={styles.stepDotText}>2</Text>
            </View>
            <Text style={styles.stepText}>Scan merchant QR</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepDot}>
              <Text style={styles.stepDotText}>3</Text>
            </View>
            <Text style={styles.stepText}>Verify with palm</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  amountCard: {
    backgroundColor: '#252542',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  quickAmounts: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAmountButton: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  quickAmountText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  merchantCard: {
    backgroundColor: '#252542',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  merchantInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 4,
  },
  merchantInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 12,
  },
  scanButton: {
    backgroundColor: '#252542',
    padding: 12,
    borderRadius: 10,
  },
  paymentMethodCard: {
    backgroundColor: '#252542',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  changeText: {
    color: '#6366f1',
    fontSize: 14,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentMethodNumber: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  payButtonDisabled: {
    backgroundColor: '#444',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  securityNoticeText: {
    color: '#10b981',
    fontSize: 14,
  },
  howItWorks: {
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 20,
  },
  howItWorksTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
    gap: 8,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    width: 70,
  },
});
