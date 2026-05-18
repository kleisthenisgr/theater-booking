import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef } from './navigationRef';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ShowsScreen from './screens/ShowsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReservationScreen from './screens/ReservationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}> 
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Εγγραφή' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Αρχική', headerBackVisible: false }} />
        <Stack.Screen name="Shows" component={ShowsScreen} options={{ title: 'Παραστάσεις' }} />
        <Stack.Screen name="Reservation" component={ReservationScreen} options={{ title: 'Κράτηση Θέσεων' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Το Προφίλ μου' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}