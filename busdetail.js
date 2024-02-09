

import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity,Text, FlatList, StyleSheet,Image ,ActivityIndicator, Alert} from 'react-native';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';

import QRCode from 'react-native-qrcode-svg';
const MyWebView = ({ route, navigation }) => {
  const { id } = route.params;
 
  const [loading, setLoading] = useState(true);

const [token, setToken] = useState('');


const [tripDetails, setTripDetails] = useState(null);



  useEffect(() => {
   // Alert(email)
    const fetchData = async () => {
    try {
      // Load token from AsyncStorage
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        setToken(storedToken);
        fetchTripDetails()
      } else {
        // Handle the case where the token is not available
        console.error('Token not found in AsyncStorage');
        return;
      }
    } catch (error) {
      console.error('Error loading token from AsyncStorage:', error);
      return;
    }
  }
  fetchData()
  
    // Check if 'ref' is not empty and log it
   

    const fetchTripDetails = async () => {
      try {
        const response = await fetch(`https://halaltravel.ai/ht/api/v1/bus/booking/tripDetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // Add any other headers required by the API
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const tripDetailsData = await response.json();
        setTripDetails(tripDetailsData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
        setLoading(false);
      }
    };

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Icon name="arrow-back" size={25} color="#007AFF" />
        </TouchableOpacity>
      ),
      headerTitle: '',
    });
  }, [navigation,token]);



 



 
  
 

  return loading || !tripDetails ? (
    <View style={{ position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',}}>
      <ActivityIndicator size="large" color="#000" />
      <Text style={{  marginTop: 10,
        fontSize: 16,
        color: '#000',}}>Loading...</Text>
    </View>
  ) : (
    <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, height: 260, margin: 20 }}>
    <View style={{ flex: 0.7 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>{tripDetails.terminalNameFrom}</Text>
        <Icon name="arrow-right" size={10} color="#000" />
        <Text style={styles.label}>{tripDetails.terminalNameTo}</Text>
      </View>
      <Text style={{fontSize:10,marginTop:10,marginBottom:10}}>Date: {tripDetails.departDate}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label1}>Operator Ticket No.</Text>
        <Text style={styles.label2}>{tripDetails.tickets[0].operatorTicketNo}</Text>
      </View>
      <View style={{marginTop:10}}></View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label1}>Booking No.</Text>
        <Text style={styles.label2}>{tripDetails.bookingNo}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <Icon name="directions-bus" color="#55B9B9" size={20} style={styles.icon} />
        <Text style={{fontWeight: 'bold', fontSize: 10, color: '#67B7B2', padding: 0, marginTop: 0}}>Trip Detail</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#55B9B9', marginLeft: 10 }} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Image
          source={{ uri: tripDetails.operatorCompanyLogo }}
          style={{ width: 60, height: 20, marginLeft: 0 }}
        />
        <Text style={{fontWeight: 'bold', fontSize: 10, color: '#67B7B2', padding: 0, marginTop: 5, marginLeft: 10 }}>{tripDetails.operatorCompanyName}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={styles.label2}>SEAT NO.</Text>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: '#67B7B2', padding: 0, marginTop: 7, marginLeft: 10 }}>{tripDetails.tickets[0].seatName}</Text>
      </View>
    </View>
    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
      {tripDetails.tickets[0].boardingPassNo ? (
        <View style={{marginBottom:20}}>
          <QRCode
            value={tripDetails.tickets[0].boardingPassNo}
            size={80}
            color="black"
            backgroundColor="white"
          />
        </View>
      ) : (
        <View style={{marginBottom:20,height:80,width:80}}>
          <Text>No QR code required</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{marginBottom: -20 }}>
          <Text style={styles.label1}>Trip No: {tripDetails.tripCode}</Text>
          <Text style={styles.label1}>{tripDetails.tickets[0].passengerIdentityName}</Text>
          <Text style={styles.label1}>{tripDetails.tickets[0].passengerIdentityNo}</Text>
        </View>
      </View>
    </View>
  </View>
  
    // Render your congratulatory message or another view here
  );
};

export default MyWebView;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  itemContainer: {
    
    
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  
  label1: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#67B7B2',
    padding:0 ,
    marginTop:5
  },
  label2: {
   
    fontSize: 10,
    color: '#67B7B2',
    borderColor:'#55B9B9',
    borderWidth:1,
    padding:5 ,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  container: {
   flex: 1,
  backgroundColor: '#fff',
 
 },
 ticket: {  width: '80%',
   borderWidth: 1,
   borderColor: '#ccc',
   padding: 20,
   marginBottom: 20,
  },
 title: {
   fontSize: 16,
    fontWeight: 'bold',
   marginTop: 10,
 },
 subtitle: {
   fontSize: 16,   marginTop: 5,
 },
  button: {
  width: '80%',
 },
 container1: {
  flex: 1,
},
itemContainer: {
  
  
  marginBottom: 10,
},
label: {
  fontWeight: 'bold',
  fontSize: 10,
},

label1: {
  fontWeight: 'bold',
  fontSize: 10,
  color: '#67B7B2',
  padding:0 ,
  marginTop:5
},
label2: {
 
  fontSize: 10,
  color: '#67B7B2',
  borderColor:'#55B9B9',
  borderWidth:1,
  padding:5 ,
  fontWeight: 'bold',
},
value: {
  fontSize: 16,
},
container: {
 flex: 1,
backgroundColor: '#fff',

},
ticket: {  width: '80%',
 borderWidth: 1,
 borderColor: '#ccc',
 padding: 20,
 marginBottom: 20,
},
title: {
 fontSize: 16,
  fontWeight: 'bold',
 marginTop: 10,
},
subtitle: {
 fontSize: 16,   marginTop: 5,
},
button: {
width: '80%',
},
});