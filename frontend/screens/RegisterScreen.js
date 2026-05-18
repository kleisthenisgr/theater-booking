import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../config/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Συμπληρώστε όλα τα πεδία.');
      return;
    }

    loading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      setSuccessMessage('Ο λογαριασμός δημιουργήθηκε! Ανακατεύθυνση σε 3 δευτερόλεπτα...');
      
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000);
    } catch (error) {
      const msg = error.response?.data?.error || 'Πρόβλημα εγγραφής. Δοκιμάστε ξανά.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#5C4033', '#1A1A1A']} // Ίδιο gradient με τις υπόλοιπες οθόνες
      style={styles.container}
    >
      <Text style={styles.title}>Νέος Λογαριασμός</Text>

      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {successMessage ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      <TextInput 
        style={styles.input} 
        placeholder="Όνομα" 
        placeholderTextColor="#95a5a6"
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#95a5a6"
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Κωδικός" 
        placeholderTextColor="#95a5a6"
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#C5A059" />
        ) : (
          <Text style={styles.buttonText}>Δημιουργία</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#ffffff', letterSpacing: 0.5 },
  input: { backgroundColor: '#ffffff', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 10, marginBottom: 15, borderWidth: 1.5, borderColor: '#C5A059', fontSize: 16, color: '#2c3e50' },
  button: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 2, borderColor: '#C5A059', elevation: 2, marginTop: 10 },
  buttonText: { color: '#C5A059', fontSize: 18, fontWeight: 'bold' }, 
  errorContainer: { backgroundColor: '#ffebee', padding: 10, borderRadius: 10, marginBottom: 20, borderWidth: 1.5, borderColor: '#f44336' },
  errorText: { color: '#d32f2f', textAlign: 'center', fontWeight: '600' },
  successContainer: { backgroundColor: '#e8f5e9', padding: 10, borderRadius: 10, marginBottom: 20, borderWidth: 1.5, borderColor: '#4caf50' },
  successText: { color: '#2e7d32', textAlign: 'center', fontWeight: '600' },
});