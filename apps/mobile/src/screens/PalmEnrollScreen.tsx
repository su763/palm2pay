import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';

export default function PalmEnrollScreen() {
  const { user, updateUser } = useAuthStore();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Permission error:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  const startEnrollment = () => {
    setIsScanning(true);
    setScanProgress(0);
    progressAnim.setValue(0);

    // Animate progress
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    // Simulate capture progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        captureAndEnroll();
      }
    }, 500);
  };

  const captureAndEnroll = async () => {
    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera not ready');
      setIsScanning(false);
      return;
    }

    setIsEnrolling(true);

    try {
      // Capture image
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });

      if (!photo?.base64) {
        throw new Error('Failed to capture image');
      }

      // Send to biometric service
      const response = await api.post('/biometric/enroll', {
        palmImageData: photo.base64,
        livenessData: {
          temperature: 36.5, // Would come from sensor in real implementation
        },
      });

      if (response.data.success) {
        updateUser({ palmEnrolled: true });
        Alert.alert(
          'Success!',
          'Your palm has been enrolled. You can now pay with your palm!',
          [{ text: 'Great!', onPress: () => setIsScanning(false) }]
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Enrollment Failed',
        error.response?.data?.error || 'Please try again'
      );
    } finally {
      setIsEnrolling(false);
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  const handleDeleteEnrollment = async () => {
    Alert.alert(
      'Delete Palm Data',
      'Are you sure you want to delete your enrolled palm data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete('/biometric/enrollment');
              updateUser({ palmEnrolled: false });
              Alert.alert('Success', 'Palm data deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete palm data');
            }
          },
        },
      ]
    );
  };

  if (isScanning) {
    return (
      <View style={styles.scanContainer}>
        <View style={styles.scanHeader}>
          <TouchableOpacity onPress={() => setIsScanning(false)}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.scanTitle}>Position Your Palm</Text>
          <View style={{ width: 32 }} />
        </View>

        <View style={styles.cameraContainer}>
          {hasPermission === false ? (
            <View style={styles.permissionDenied}>
              <Ionicons name="camera-off" size={64} color="#666" />
              <Text style={styles.permissionText}>
                Camera permission is required to enroll your palm
              </Text>
            </View>
          ) : (
            <>
              <Camera
                ref={cameraRef}
                style={styles.camera}
                type="back"
                ratio="1:1"
              />
              <View style={styles.overlay}>
                <View style={styles.scanFrame}>
                  <Animated.View
                    style={[
                      styles.scanLine,
                      {
                        transform: [
                          {
                            translateY: progressAnim.interpolate({
                              inputRange: [0, 100],
                              outputRange: [0, 300],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.scanInstructions}>
          <Ionicons name="hand-left" size={80} color="#6366f1" />
          <Text style={styles_instructionText}>
            Place your palm flat and steady
          </Text>
          <Text style={styles_instructionSubtext}>
            Keep your hand still while scanning
          </Text>
        </View>

        {isEnrolling && (
          <View style={styles.enrollingOverlay}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.enrollingText}>Processing your palm...</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Palm Payment</Text>
        <Text style={styles.subtitle}>
          Pay securely with just your palm
        </Text>
      </View>

      {user?.palmEnrolled ? (
        <View style={styles.enrolledContent}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color="#10b981" />
          </View>
          <Text style={styles.enrolledTitle}>Palm Enrolled!</Text>
          <Text style={styles.enrolledDescription}>
            Your palm is now registered for payments. Look for Palm2Pay
            terminals at participating merchants.
          </Text>

          <TouchableOpacity style={styles.testButton}>
            <Ionicons name="flash" size={20} color="#6366f1" />
            <Text style={styles.testButtonText}>Test Palm Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteEnrollment}
          >
            <Ionicons name="trash" size={20} color="#ef4444" />
            <Text style={styles.deleteButtonText}>Delete Palm Data</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.notEnrolledContent}>
          <View style={styles.illustration}>
            <Ionicons name="hand-left" size={120} color="#6366f1" />
          </View>

          <Text style={styles.stepTitle}>How to enroll:</Text>

          <View style={styles.steps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Place your palm flat on the scanner</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Hold steady while we scan</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>You're done! Start paying with your palm</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.enrollButton} onPress={startEnrollment}>
            <Ionicons name="scan" size={24} color="#fff" />
            <Text style={styles.enrollButtonText}>Start Enrollment</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.securityInfo}>
        <Ionicons name="shield-checkmark" size={24} color="#10b981" />
        <Text style={styles.securityText}>
          Your biometric data is encrypted and secure
        </Text>
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
    alignItems: 'center',
    marginBottom: 30,
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
  enrolledContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  successIcon: {
    marginBottom: 20,
  },
  enrolledTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  enrolledDescription: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  testButton: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 16,
  },
  notEnrolledContent: {
    flex: 1,
  },
  illustration: {
    alignItems: 'center',
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  steps: {
    gap: 16,
    marginBottom: 30,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepText: {
    color: '#ccc',
    fontSize: 16,
    flex: 1,
  },
  enrollButton: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  securityText: {
    color: '#10b981',
    fontSize: 14,
  },
  scanContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  permissionDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 280,
    height: 280,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6366f1',
    overflow: 'hidden',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  scanLine: {
    height: 2,
    backgroundColor: '#6366f1',
    width: '100%',
  },
  scanInstructions: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#1a1a2e',
  },
  scanInstructionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  scanInstructionSubtext: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
  enrollingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  enrollingText: {
    color: '#fff',
    fontSize: 16,
  },
});

// Fix for styles object
const styles_instructionText = styles.scanInstructionText;
const styles_instructionSubtext = styles.scanInstructionSubtext;
