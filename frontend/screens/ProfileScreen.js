import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient'; 
import api from '../config/api';

export default function ProfileScreen({ navigation }) {
  const [reservations, setReservations] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => { fetchReservations(); }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/user/reservations');
      setReservations(response.data);
    } catch (error) { console.log(error); }
  };

  const handleCancel = async (reservationId) => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoadingId(reservationId);
    
    try {
      await api.delete(`/reservations/${reservationId}`);
      setSuccessMessage("Η κράτηση ακυρώθηκε επιτυχώς.");
      fetchReservations();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Αποτυχία ακύρωσης.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm("Είστε σίγουροι; Ο λογαριασμός σας θα διαγραφεί οριστικά.");
      if (confirmDelete) executeDeleteAccount();
    } else {
      Alert.alert(
        "Διαγραφή Λογαριασμού",
        "Είστε σίγουροι; Ο λογαριασμός σας θα διαγραφεί οριστικά.",
        [
          { text: "Ακύρωση", style: "cancel" },
          { text: "Διαγραφή", style: "destructive", onPress: () => executeDeleteAccount() }
        ]
      );
    }
  };

  const executeDeleteAccount = async () => {
    try {
      await api.delete('/auth/delete-account');
      if (Platform.OS === 'web') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
      } else {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('user');
      }
      navigation.replace('Login');
    } catch (error) {
      setErrorMessage("Αποτυχία διαγραφής λογαριασμού.");
    }
  };

  const isFuture = (dateString) => new Date(dateString) > new Date();

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('el-GR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <LinearGradient
      colors={['#5C4033', '#1A1A1A']} 
      style={styles.container}
    >
      <Text style={styles.title}>Οι Κρατήσεις μου</Text>

      {errorMessage ? (
        <View style={styles.errorContainer}><Text style={styles.errorText}>{errorMessage}</Text></View>
      ) : null}
      {successMessage ? (
        <View style={styles.successContainer}><Text style={styles.successText}>{successMessage}</Text></View>
      ) : null}

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.reservation_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.show_title}</Text>
              <Text style={[styles.statusBadge, { color: item.status === 'CANCELLED' ? '#e74c3c' : '#27ae60' }]}>
                {item.status === 'CANCELLED' ? 'ΑΚΥΡΩΘΗΚΕ' : 'ΕΠΙΒΕΒΑΙΩΜΕΝΗ'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Θέατρο:</Text>
              <Text style={styles.value}>{item.theatre_name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Αίθουσα:</Text>
              <Text style={styles.value}>{item.hall_name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Ημερομηνία:</Text>
              {/* Εδώ έγινε η αλλαγή στη μορφή της ημερομηνίας */}
              <Text style={styles.value}>{formatDateTime(item.start_time)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Θέσεις:</Text>
              <Text style={[styles.value, styles.seatsHighlight]}>{item.seats}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Σύνολο:</Text>
              <Text style={styles.value}>{item.total_amount}€</Text>
            </View>
            
            {isFuture(item.start_time) && item.status !== 'CANCELLED' && (
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => handleCancel(item.reservation_id)}
                disabled={loadingId === item.reservation_id}
              >
                {loadingId === item.reservation_id ? 
                  <ActivityIndicator color="#e74c3c" /> : 
                  <Text style={styles.cancelText}>Ακύρωση Κράτησης</Text>
                }
              </TouchableOpacity>
            )}
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteAccountText}>Διαγραφή Λογαριασμού</Text>
          </TouchableOpacity>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#ffffff', letterSpacing: 0.5 },
  card: { 
    padding: 15, 
    backgroundColor: '#ffffff', 
    marginBottom: 12, 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: '#C5A059', 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', flex: 1 },
  statusBadge: { fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  infoRow: { flexDirection: 'row', marginBottom: 5 },
  label: { fontSize: 14, color: '#7f8c8d', width: 90 },
  value: { fontSize: 14, color: '#2c3e50', fontWeight: '500' },
  seatsHighlight: { color: '#C5A059', fontWeight: 'bold' },
  cancelButton: { 
    marginTop: 15, 
    padding: 12, 
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: '#e74c3c' 
  },
  cancelText: { color: '#e74c3c', fontWeight: 'bold', textAlign: 'center' },
  deleteAccountButton: {
    marginTop: 30,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#c62828' 
  },
  deleteAccountText: { color: '#c62828', fontWeight: 'bold', fontSize: 16 },
  errorContainer: { backgroundColor: '#ffebee', padding: 10, borderRadius: 10, marginBottom: 20, borderWidth: 1.5, borderColor: '#f44336' },
  errorText: { color: '#d32f2f', textAlign: 'center', fontWeight: '600' },
  successContainer: { backgroundColor: '#e8f5e9', padding: 10, borderRadius: 10, marginBottom: 20, borderWidth: 1.5, borderColor: '#4caf50' },
  successText: { color: '#2e7d32', textAlign: 'center', fontWeight: '600' },
});