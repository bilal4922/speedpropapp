import { View, Text, Button, SafeAreaView, StatusBar, StyleSheet,TextInput, FlatList,Image,TouchableOpacity, Dimensions,ActivityIndicator,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Rating, AirbnbRating } from 'react-native-ratings';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'react-native-loading-placeholder';
import { fetchData } from './redux/actions';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
 
 const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
 
  const screenWidth = Dimensions.get('window').width;
  const [hotelsData, setHotelsData] = useState([]);
  const [page, setpage] = useState(2);
  const [bookingref, setbookingref] = useState('');
  const [loading, setLoading] = useState(false);
  const [tripsData, setTripsData] = useState([]);
  const [tripsPastData, setTripsPastData] = useState([]);
 // const { address } = route.params;
  //sconst { date } = route.params;
  var  token = ''

  const [showUpcomingTrips, setShowUpcomingTrips] = useState(true);

  const showUpcoming = () => {
    setShowUpcomingTrips(true);
  };

  const showPast = () => {
    setShowUpcomingTrips(false);
  };
  const data = [
    {
      origin: 'Melaka Sentral',
      destination: 'Larkin Sentral',
      price: 'RM20.00',
      type: 'DEPART',
      date: '28 Sep 2023',
      time: '8:30AM',
      operator: 'KKKL SDN BHD (Terus Nanti)',
      seats: 1,
    },
    {
      origin: 'Larkin Sentral',
      destination: 'Melaka Sentral',
      price: 'RM20.00',
      type: 'RETURN',
      date: '30 Sep 2023',
      time: '8:30AM',
      operator: 'KKKL SDN BHD (Terus Nanti)',
      seats: 2,
    },
  ];

const Item = ({ item }) => (
  <TouchableOpacity
  style={styles.item}
  onPress={() => navigation.navigate('busdetail', { id: item.id })}
>
  <View style={styles.item}>
 <View style={styles.row}>
      <View style={styles.boxWhite}>
        <Text style={styles.title}>{item.terminalNameFrom} - {item.terminalNameTo}</Text>
      </View>
      <View style={styles.boxBlue}>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
    
    <View style={styles.row}>
      {/* <Text style={styles.info}>{item.type}</Text> */}
      <Text style={styles.info}>{item.departDate}</Text>
      <Text style={styles.info}>{item.departTime}</Text>
      {/* <Text style={styles.info}>{item.seats} Seat(s)</Text> */}
    </View>
    <Text style={styles.operator}>{item.operatorName}</Text>
  
  </View>
  </TouchableOpacity>
);
const Item2 = ({ item }) => (
  <TouchableOpacity
  style={styles.item}
  onPress={() => navigation.navigate('busdetail', { id: item.id })}
>
  <View style={styles.item}>
 <View style={styles.row}>
      <View style={styles.boxWhite}>
        <Text style={styles.title}>{item.terminalNameFrom} - {item.terminalNameTo}</Text>
      </View>
      <View style={styles.boxBlue}>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
    
    <View style={styles.row}>
      {/* <Text style={styles.info}>{item.type}</Text> */}
      <Text style={styles.info}>{item.departDate}</Text>
      <Text style={styles.info}>{item.departTime}</Text>
      {/* <Text style={styles.info}>{item.seats} Seat(s)</Text> */}
    </View>
    <Text style={styles.operator}>{item.operatorName}</Text>
  
  </View>
  </TouchableOpacity>
);
  useEffect(() => {
   
   
      const loadUserIdFromAsyncStorage = async () => {
        try {
          const storedUserIdString = await AsyncStorage.getItem('userId');
          const token1 = await AsyncStorage.getItem('token');
          if (storedUserIdString) {
           // settoken(token1)
           token = token1
           fetchTripsData();
          //  const storedUserId = JSON.parse(storedUserIdString);
          //  Alert.alert(`User ${storedUserId} ${token1}`);
         //   fetchData();
          
          //  setUserId(storedUserId);
          }
        } catch (error) {
          console.error('Error loading user ID from AsyncStorage:', error);
        }
      };
      loadUserIdFromAsyncStorage();

      const fetchTripsData = async () => {
        try {

          const response = await fetch('https://halaltravel.ai/ht/api/v1/bus/booking/upcomingTrips', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              // Add any other headers required by the API
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }
          const jsonData = await response.json();
          setTripsData(jsonData.elements);
          setLoading(false);
          fetchTripsData1();
        } catch (error) {
          console.error('Failed to fetch trips data:', error);
          setLoading(false);
        }
      };

      const fetchTripsData1 = async () => {
        try {

          const response = await fetch('https://halaltravel.ai/ht/api/v1/bus/booking/pastTrips', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              // Add any other headers required by the API
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }
          const jsonData = await response.json();
          setTripsPastData(jsonData.elements);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch trips data:', error);
          setLoading(false);
        }
      };
  
      //fetchTripsData();
     
      
  

 

   // fetchData();

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
        <Icon name="arrow-back" size={25} color="#007AFF" />
      </TouchableOpacity>
      ),
      headerTitle: '',
    });
  }, [navigation]);

 
  



  if (loading) {
    return (
      <View style={styles.centered}>
        {/* <ActivityIndicator size="large" /> */}
        <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Status Bar */}
    
      <View style={{ flex: 1} }>
      {/* Buttons container with flexDirection: 'row' */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        {/* Button to show upcoming trips */}
        <Button title="Upcoming Trips" onPress={showUpcoming} />
        {/* Button to show past trips */}
        <Button title="Past Trips" onPress={showPast} />
      </View>

      {/* Conditional rendering based on showUpcomingTrips state */}
      {showUpcomingTrips ? (
        <View style={{flex:1}}>
            <FlatList
      data={tripsData}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text>No trips available</Text>}

      style={styles.list}
    />
        </View>
      ) : (
        <View style={{flex:1}}>
            <FlatList
      data={tripsPastData}
      renderItem={({ item }) => <Item2 item={item} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text>No trips available</Text>}

      style={styles.list}
    />
        </View>
      )}
    </View>
      </SafeAreaView>
    
    
  );
};
  
const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:20,
   
  },
  list: {
    backgroundColor: '#fff',
    marginn:20 ,
  },
  item: {
    
   
   margin: 20,
    borderColor: '#55B9B9',
    borderWidth:1,
    borderRadius:10
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#fff',
    backgroundColor:'#55B9B9',
  },
  priceTopRight: {
    position: 'absolute', // Make price absolute for positioning
    top: 0, // Position at top
    right: 0, // Position at right
  },
  type: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
  },
  operator: {
    fontSize: 12,
    padding: 14 ,
    
  },
  seats: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row', // Arrange elements horizontally
    justifyContent: 'space-between', // Distribute evenly with space between
  },
  row: {
    flexDirection: 'row', // Allow absolute positioning for overlays
  },
  boxWhite: {
    backgroundColor: '#fff', // White background
    flex: 1.4, // Equal width with other box
    padding: 10, // Add padding for spacing
    borderTopLeftRadius: 10,
  },
  boxBlue: {
    backgroundColor: '#55B9B9', // Blue background
    flex: 0.6, // Equal width with other box
    padding: 10, // Add padding for spacing
    borderTopRightRadius: 10,
  },
  row1: {
    flexDirection: 'row', // Arrange elements horizontally
    alignItems: 'center', // Vertically center elements
    justifyContent: 'space-between', // Distribute elements with space between
  },
  info: {
    // ... your styles for type, date, time, seats
    flex: 1, // Make each Text element flexible and share available space
    marginHorizontal: 4, 
    padding:10// Add some horizontal spacing if desired
  },
});


export default HomeScreen;
