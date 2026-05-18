import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../config/api';

export default function ShowsScreen({ route, navigation }) {
  const { theatreId, theatreName } = route.params;
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await api.get('/shows');
      const theatreShows = response.data.filter(s => s.theatre_id === theatreId);
      setShows(theatreShows);
    } catch (error) {
      console.log('Error fetching shows:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#5C4033', '#1A1A1A']} 
      style={styles.container}
    >
      <Text style={styles.title}>Παραστάσεις: {theatreName}</Text>
      
      <FlatList
        data={shows}
        keyExtractor={(item) => item.show_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Reservation', { showId: item.show_id, showTitle: item.title })}
          >
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.detailsText}>
              Διάρκεια: <Text style={styles.highlight}>{item.duration_minutes} λ.</Text> | Όριο ηλικίας: <Text style={styles.highlight}>{item.age_rating}</Text>
            </Text>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#ffffff', letterSpacing: 0.5 },
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
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 6, color: '#2c3e50' }, 
  detailsText: { fontSize: 14, color: '#7f8c8d' },
  highlight: { color: '#C5A059', fontWeight: 'bold' }
});