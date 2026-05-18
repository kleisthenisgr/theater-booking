import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../config/api';

const screenWidth = Dimensions.get('window').width;
const containerPadding = 40; 
const seatWidth = (screenWidth - containerPadding) / 10;

export default function ReservationScreen({ route, navigation }) {
  const { showId, showTitle } = route.params;
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => { fetchShowtimes(); }, []);

  const fetchShowtimes = async () => {
    try {
      const response = await api.get(`/showtimes/${showId}`);
      setShowtimes(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchSeats = async (showtimeId) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await api.get(`/seats/${showtimeId}`);
      setSeats(response.data);
      setSelectedShowtime(showtimeId);
      setSelectedSeats([]);
    } catch (error) { console.error(error); }
  };

  const formatDateTime = (dateString) => {
    const d = new Date(dateString);
    const date = d.toLocaleDateString('el-GR'); 
    const time = d.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }); 
    return `${date} ${time}`;
  };

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setErrorMessage('Παρακαλώ επιλέξτε τουλάχιστον μία θέση.');
      return;
    }
    setLoading(true);
    const currentShowtime = showtimes.find(st => st.showtime_id === selectedShowtime);
    const totalAmount = selectedSeats.length * parseFloat(currentShowtime.base_price);
    try {
      await api.post('/reservations', { showtimeId: selectedShowtime, seatIds: selectedSeats, totalAmount });
      setSuccessMessage(`Η κράτηση ολοκληρώθηκε! Ανακατεύθυνση...`);
      setTimeout(() => { navigation.reset({ index: 0, routes: [{ name: 'Home' }] }); }, 2500);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Η κράτηση απέτυχε.');
    } finally { setLoading(false); }
  };

  return (
    <LinearGradient colors={['#5C4033', '#1A1A1A']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>{showTitle}</Text>
        
        {errorMessage ? <View style={styles.errorContainer}><Text style={styles.errorText}>{errorMessage}</Text></View> : null}
        {successMessage ? <View style={styles.successContainer}><Text style={styles.successText}>{successMessage}</Text></View> : null}

        <Text style={styles.subHeader}>1. Επιλέξτε Ώρα & Αίθουσα:</Text>
        <View style={styles.row}>
          {showtimes.map((item) => (
            <TouchableOpacity
              key={item.showtime_id}
              style={[styles.timeButton, selectedShowtime === item.showtime_id && styles.selectedButton]}
              onPress={() => fetchSeats(item.showtime_id)}
            >
              <Text style={selectedShowtime === item.showtime_id ? styles.whiteText : styles.goldText}>
                {formatDateTime(item.start_time)} - {item.hall_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedShowtime && (
          <View style={styles.seatSection}>
            <Text style={styles.subHeader}>2. Επιλέξτε Θέσεις:</Text>
            <View style={styles.screenIndicator}><Text style={styles.screenText}>ΣΚΗΝΗ / ΟΘΟΝΗ</Text></View>
            
            <View style={styles.seatGrid}>
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.seat_id);
                const isAvailable = seat.is_available;
                
                let chairColor = '#F5E6CC';
                if (isSelected) chairColor = '#C5A059';
                if (!isAvailable) chairColor = '#4A3B32';

                return (
                  <TouchableOpacity
                    key={seat.seat_id}
                    disabled={!isAvailable || loading}
                    style={styles.seatContainer}
                    onPress={() => toggleSeat(seat.seat_id)}
                  >
                    <MaterialCommunityIcons 
                      name="seat" 
                      size={seatWidth - 4} 
                      color={chairColor} 
                    />
                    <Text style={[
                      styles.seatText,
                      !isAvailable && styles.takenSeatText,
                      isSelected && styles.selectedSeatText
                    ]}>
                      {seat.row_label}{seat.seat_number}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            <TouchableOpacity style={styles.bookButton} onPress={handleBooking} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#C5A059" />
              ) : (
                <Text style={styles.bookButtonText}>Κράτηση ({selectedSeats.length} θέσεις)</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#ffffff', letterSpacing: 0.5 },
  subHeader: { fontSize: 18, fontWeight: '600', marginVertical: 12, color: '#C5A059' }, 
  row: { flexDirection: 'column', marginBottom: 20 },
  timeButton: { padding: 14, borderWidth: 2, borderColor: '#C5A059', borderRadius: 10, marginBottom: 12, backgroundColor: '#ffffff', elevation: 2 },
  selectedButton: { backgroundColor: '#C5A059' },
  whiteText: { color: '#ffffff', fontWeight: 'bold' },
  goldText: { color: '#C5A059', fontWeight: 'bold' },
  
  seatSection: { marginTop: 10, paddingBottom: 20 },
  screenIndicator: { height: 35, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginBottom: 25, borderRadius: 10, borderWidth: 2, borderColor: '#C5A059' },
  screenText: { color: '#C5A059', fontWeight: 'bold', letterSpacing: 1.5, fontSize: 12 },
  
  seatGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  
  // Νέα styles για τα εικονίδια
  seatContainer: { width: seatWidth, alignItems: 'center', justifyContent: 'center', marginVertical: 4 },
  seatText: { fontSize: 9, fontWeight: 'bold', color: '#F5E6CC', marginTop: -2 },
  takenSeatText: { color: '#4A3B32' },
  selectedSeatText: { color: '#C5A059' },
  
  bookButton: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, marginTop: 35, alignItems: 'center', borderWidth: 2, borderColor: '#C5A059', elevation: 3 },
  bookButtonText: { color: '#C5A059', fontSize: 18, fontWeight: 'bold' },
  
  errorContainer: { backgroundColor: '#ffebee', padding: 12, borderRadius: 10, marginBottom: 20, borderWidth: 1.5, borderColor: '#f44336' },
  errorText: { color: '#d32f2f', textAlign: 'center', fontWeight: '600' },
  successContainer: { backgroundColor: '#e8f5e9', padding: 12, borderRadius: 10, marginBottom: 20, borderWidth: 1.5, borderColor: '#4caf50' },
  successText: { color: '#2e7d32', textAlign: 'center', fontWeight: '600' },
});