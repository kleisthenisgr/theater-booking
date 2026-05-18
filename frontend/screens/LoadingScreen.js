import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
}

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const checkToken = async () => {
      try {
        let token;
        if (Platform.OS === 'web') {
          token = localStorage.getItem('userToken');
        } else {
          token = await SecureStore.getItemAsync('userToken');
        }

        const isValid = token && !isTokenExpired(token);

        if (!isValid) {
          if (Platform.OS === 'web') {
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
          } else {
            await SecureStore.deleteItemAsync('userToken');
            await SecureStore.deleteItemAsync('user');
          }
        }

        setTimeout(() => {
          navigation.replace(isValid ? 'Home' : 'Login');
        }, 500);
      } catch (e) {
        setTimeout(() => {
          navigation.replace('Login');
        }, 500);
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }
});