import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../config/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Παρακαλώ συμπληρώστε όλα τα πεδία');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });

      if (Platform.OS === 'web') {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); 
      } else {
        await SecureStore.setItemAsync('userToken', response.data.token);
        await SecureStore.setItemAsync('user', JSON.stringify(response.data.user)); 
      }

      navigation.replace('Home');
    } catch (error) {
      console.log('Login Error:', error);

      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Αποτυχία σύνδεσης. Ελέγξτε τα στοιχεία σας ή τη σύνδεσή σας.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#5C4033', '#1A1A1A']}
      style={styles.container}
    >
      <Text style={styles.title}>Είσοδος</Text>
      
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#95a5a6"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Κωδικός Πρόσβασης"
        placeholderTextColor="#95a5a6"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#C5A059" />
        ) : (
          <Text style={styles.buttonText}>Σύνδεση</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Δεν έχετε λογαριασμό; Εγγραφείτε εδώ</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#ffffff', letterSpacing: 0.5 }, // Λευκός έντονος τίτλος
  input: { backgroundColor: '#ffffff', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 10, marginBottom: 15, borderWidth: 1.5, borderColor: '#C5A059', fontSize: 16, color: '#2c3e50' }, // Άσπρα inputs με Σκούρο Gold περίγραμμα
  button: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, borderWidth: 2, borderColor: '#C5A059', elevation: 2 }, // Λευκό κουμπί με Σκούρο Gold περίγραμμα
  buttonText: { color: '#C5A059', fontSize: 18, fontWeight: 'bold' }, // Σκούρο Gold κείμενο
  linkText: { marginTop: 20, color: '#C5A059', textAlign: 'center', fontWeight: '500', textDecorationLine: 'underline' }, // Σκούρο χρυσό link με υπογράμμιση
  errorContainer: { backgroundColor: '#ffebee', padding: 10, borderRadius: 10, marginBottom: 20, borderWidth: 1.5, borderColor: '#f44336' },
  errorText: { color: '#d32f2f', textAlign: 'center', fontWeight: '600' },
});