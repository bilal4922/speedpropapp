import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BusSearchScreen = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const searchBuses = () => {
    // Implement bus search logic here
    console.log('Searching for buses...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Express Bus</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Origin"
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
        />
      </View>
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Departure Date"
          value={departureDate}
          onChangeText={setDepartureDate}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Return Date (Optional)"
          value={returnDate}
          onChangeText={setReturnDate}
        />
      </View>
      <Button title="Search" onPress={searchBuses} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 10,
    fontSize: 16,
  },
});

export default BusSearchScreen;