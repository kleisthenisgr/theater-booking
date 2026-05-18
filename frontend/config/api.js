import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { navigationRef } from '../navigationRef';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, 
});

api.interceptors.request.use(
  async (config) => {
    let token;
    if (Platform.OS === 'web') {
      token = localStorage.getItem('userToken');
    } else {
      token = await SecureStore.getItemAsync('userToken');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`🚀 [API Request] ${config.method.toUpperCase()} -> ${config.url}`);
    if (config.data) console.log('📦 Data:', config.data);

    return config;
  },
  (error) => {
    console.error('❌ [Request Error]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API Response] ${response.status} <- ${response.config.url}`);

    return response;
  },
  async (error) => {
    const status = error.response ? error.response.status : 'Network Error';
    const url = error.config ? error.config.url : 'Unknown URL';
    
    console.error(`🛑 [API Error] ${status} <- ${url}`);
    if (error.response?.data) console.error('⚠️ Error Details:', error.response.data);

    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config.url.includes('/auth/login');
      if (!isLoginRequest) {
        if (Platform.OS === 'web') {
          localStorage.removeItem('userToken');
          localStorage.removeItem('user');
        } else {
          await SecureStore.deleteItemAsync('userToken');
          await SecureStore.deleteItemAsync('user');
        }

        if (navigationRef.isReady()) {
          navigationRef.navigate('Login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;