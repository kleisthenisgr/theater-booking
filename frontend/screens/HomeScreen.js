import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Ionicons } from '@expo/vector-icons';
import api from '../config/api';

export default function HomeScreen({ navigation }) {
  const [theatres, setTheatres] = useState([]);
  const [filteredTheatres, setFilteredTheatres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchTheatres();
    getUserInfo();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#ffffff', 
      },
      headerTintColor: '#C5A059', 
      headerRight: () => (
        userName ? (
          <Text style={{ marginRight: 15, color: '#C5A059', fontWeight: 'bold' }}>
            {userName}
          </Text>
        ) : null
      ),
    });
  }, [userName]);

  const fetchTheatres = async () => {
    try {
      const response = await api.get('/theatres');
      setTheatres(response.data);
      setFilteredTheatres(response.data);
    } catch (error) {
      console.log('Error fetching theatres:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      let userJson;
      if (Platform.OS === 'web') {
        userJson = localStorage.getItem('user');
      } else {
        userJson = await SecureStore.getItemAsync('user');
      }
      if (userJson) {
        const user = JSON.parse(userJson);
        setUserName(user.name);
      }
    } catch (e) {
      console.log('Error fetching user info:', e);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredTheatres(theatres);
    } else {
      const lowerText = text.toLowerCase();
      const filtered = theatres.filter(item => {
        return (
          item.name.toLowerCase().includes(lowerText) || 
          item.location.toLowerCase().includes(lowerText) ||
          (item.show_titles && item.show_titles.toLowerCase().includes(lowerText))
        );
      });
      setFilteredTheatres(filtered);
    }
  };

  const logout = async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
      } else {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('user');
      }
      navigation.replace('Login');
    } catch (error) {
      navigation.replace('Login');
    }
  };

  return (
    <LinearGradient
      colors={['#5C4033', '#1A1A1A']} 
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#C5A059" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Αναζήτηση θεάτρου, τοποθεσίας ή παράστασης..."
          placeholderTextColor="#95a5a6"
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filteredTheatres}
        keyExtractor={(item) => item.theatre_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Shows', { theatreId: item.theatre_id, theatreName: item.name })}
          >
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
              {item.show_titles && (
                <Text style={styles.showsPreview} numberOfLines={1}>
                  Παίζουν: {item.show_titles.split(',').join(', ')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Δεν βρέθηκαν αποτελέσματα</Text>}
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileButtonText}>Το Προφίλ μου (Κρατήσεις)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Αποσύνδεση</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }, 
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#C5A059',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
  },

  card: { padding: 15, backgroundColor: '#ffffff', marginBottom: 12, borderRadius: 10, borderWidth: 2, borderColor: '#C5A059', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }, 
  name: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' }, 
  location: { fontSize: 14, color: '#7f8c8d', marginTop: 2 }, 
  showsPreview: { fontSize: 12, color: '#C5A059', marginTop: 5, fontStyle: 'italic', fontWeight: 'bold' }, 
  buttons: { marginTop: 15, marginBottom: 20 }, 
  profileButton: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10, borderWidth: 2, borderColor: '#C5A059', elevation: 2 }, 
  profileButtonText: { color: '#C5A059', fontWeight: 'bold', fontSize: 16 }, 
  logoutButton: { backgroundColor: '#ffffff', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 2, borderColor: '#e74c3c' }, 
  logoutButtonText: { color: '#e74c3c', fontWeight: 'bold' }, 
  emptyText: { textAlign: 'center', marginTop: 20, color: '#bdc3c7' }
});