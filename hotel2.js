import React, { useEffect, useState } from 'react';
import { View, Button, SafeAreaView,Text, StyleSheet, TouchableOpacity, Image,ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import {SliderBox} from 'react-native-image-slider-box';
import { ScrollView } from 'react-native-gesture-handler';

import  Icon  from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ route }) => {
  const hotelData = {
    name: 'TROVE Johor Bahru',
    rating: 4.3,
    reviews: 293,
    location: 'Johor Bahru City Center, Johor Bahru',
    amenities: ['Swimming Pool', 'Nightclub', 'Car Park', 'Pets Allowed'],
    price: 45,
  };


  const { hotelid} = route.params;
  var  token = ''
  const { hotelref } = route.params;
  const { hotelname } = route.params;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [amenities, setAmenities] = useState([]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [descriptions, setDescriptions] = useState([]);

  //const [rooms, setRooms] = useState(null);

  var rooms = [];
  const [rooms2, setRooms2] = useState([]);
  // const [images, setImages] = useState([
  //   'https://source.unsplash.com/1024x768/?nature',
  //   'https://source.unsplash.com/1024x768/?water',
  //   'https://source.unsplash.com/1024x768/?girl',
  //   'https://source.unsplash.com/1024x768/?tree',
  //   // Add more image URLs as needed
  // ]);
  const [images, setImages] = useState([]);

  const handleImagePressed = (index) => {
    console.warn(`Image ${index} pressed`);
  };

  useEffect(() => {
    const loadUserIdFromAsyncStorage = async () => {
      try {
        const storedUserIdString = await AsyncStorage.getItem('userId');
        const token1 = await AsyncStorage.getItem('token');
        if (storedUserIdString) {
         // settoken(token1)
         token = token1
        //  const storedUserId = JSON.parse(storedUserIdString);
        //  Alert.alert(`User ${storedUserId} ${token1}`);
          fetchData();
        
        //  setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error loading user ID from AsyncStorage:', error);
      }
    };
    loadUserIdFromAsyncStorage();
    const fetchData = async () => {
      try {
        const response = await fetch('https://halaltravel.ai/ht/api/v1/hotel/search/byHotelId', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // Add any other headers required by the API
          },
          body: JSON.stringify({
            // hotelId: "invito_hotel_suites",
            // searchReference: "57325a27-4125-4544-ae26-8a0b90f4625a"
            "hotelId" : hotelid,
            "searchReference" : hotelref 
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const json = await response.json();
        setImages(json.hotelImages);
        setAmenities(json.amenities);
        setDescriptions(json.description);
      //  setRooms(json.rooms);
      rooms = json.rooms; 
      console.log('API Response:', rooms);
      setRooms2(json.rooms); 
     // console.log('rrrrrrrrrrrr',json.rooms)
     //   setHotelsData(json.elements);
       // setbookingref(json.searchReference)
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      } finally {
        setLoading(false);
      //  setIsRefreshing(false);
      }
    };
  
  //  fetchData();
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
        <Icon name="arrow-back" size={25} color="#007AFF" />
      </TouchableOpacity>
      ),
      headerTitle: '',
    });
    // navigation.setOptions({
    //   headerLeft: () => (
    //     <Button
    //       onPress={() => navigation.goBack()}
    //       title="Back"
    //       color="#007AFF"
    //     />
    //   ),
    // });
  }, [navigation]);


  const AmenitiesDisplay = ({ amenities }) => {
    return (
      <View>
        {amenities.slice(0, showAllAmenities ? amenities.length : 1).map((category, index) => {
          const categoryName = Object.keys(category)[0];
          return (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{categoryName}</Text>
              {category[categoryName].map((item, itemIndex) => (
                <Text key={itemIndex} style={{ marginLeft: 10 }}>
                  - {item}
                </Text>
              ))}
            </View>
          );
        })}
        {!showAllAmenities && (
          <Button
            title="See More"
            onPress={() => setShowAllAmenities(true)}
          />
        )}
      </View>
    );
  };
  
  const DescriptionDisplay = ({ descriptions }) => {
    return (
      <View>
        {descriptions.map((category, index) => {
          const categoryName = Object.keys(category)[0];
          return (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{categoryName}</Text>
              {category[categoryName].map((item, itemIndex) => (
                <Text key={itemIndex} style={{ marginLeft: 10 }}>
                  {item}
                </Text>
              ))}
            </View>
          );
        })}
      </View>
    );
  };
  
  
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView  style  ={{width:'100%',height:1600, backgroundColor:'#fff'}} >

      <SliderBox
        images={images}
        sliderBoxHeight={200}
        onCurrentImagePressed={handleImagePressed}
        dotColor="#FFf"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        resizeMode="cover"
        paginationBoxStyle={styles.paginationBoxStyle}
        dotStyle={styles.dotStyle}
        ImageComponentStyle={styles.imageComponentStyle}
        imageLoadingColor="#fff"
      />
       <View style={styles.container}>
     
      <Text style={styles.title}>{hotelname}</Text>
     

      <Text style={styles.amenitiesTitle}>Top Amenities</Text>
     

      {/* <AmenitiesDisplay amenities={amenities} /> */}
      <View>
      {amenities.slice(0, showAllAmenities ? amenities.length : 1).map((category, index) => {
        const categoryName = Object.keys(category)[0];
        return (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{categoryName}</Text>
            {category[categoryName].map((item, itemIndex) => (
              <Text key={itemIndex} style={{ marginLeft: 10 }}>
                - {item}
              </Text>
            ))}
          </View>
        );
      })}
      <Button
        title={showAllAmenities ? "See Less" : "See More"}
        onPress={() => setShowAllAmenities(!showAllAmenities)}
      />
    </View>
   
<DescriptionDisplay descriptions={descriptions} />

     
    </View>
    <View style={styles.bottomContainer}>
     
      <TouchableOpacity 
      
      onPress={() => {
        try {
          // Log the 'rooms' object directly
        //  console.log(rooms);
      
          // Navigate to 'hotel3' screen with 'rooms' and 'id' parameters
          navigation.navigate('hotel3', {
            rooms1: rooms2,
            id: 'ffff'
          });
        } catch (error) {
          // Log any errors to the console
          console.error("Error navigating to 'hotel3':", error);
        }
      }}
      
      
      style={styles.button}>
        <Text style={styles.buttonText}>See all rooms</Text>
      </TouchableOpacity>
    </View>
      
</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paginationBoxStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  imageComponentStyle: {
    borderRadius: 0,
    width: '100%',
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
 
  },
  rating: {
    marginVertical: 8,
  },
  reviews: {
    fontSize: 16,
    color: 'grey',
  },
  location: {
    fontSize: 16,
    color: 'grey',
  },
  amenitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  amenity: {
    fontSize: 16,
    marginTop: 5,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  reviewContainer: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  reviewText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewAuthor: {
    fontSize: 14,
    color: 'grey',
  },
  button: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#5392F9',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startText: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  priceText: {
    fontSize: 24,
    color: '#E53935', // This color should be adjusted to match the design.
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#5392F9', // This color should be adjusted to match the design.
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
