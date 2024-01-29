// import { View, Text, Button, SafeAreaView, StatusBar, StyleSheet,TextInput, FlatList,Image,TouchableOpacity, Dimensions,ActivityIndicator   } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import React, { useState ,useEffect } from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { Rating, AirbnbRating } from 'react-native-ratings';
// import  Icon  from 'react-native-vector-icons/MaterialIcons';
// import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'react-native-loading-placeholder';
// import { fetchData } from './redux/actions';
// import AnimatedLoader from "react-native-animated-loader";
// //import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to have this library installed

// const HomeScreen = ({ route }) => {
//   const navigation = useNavigation();
 
//  const [selectedFilter, setSelectedFilter] = useState(null);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [selectedSort, setSelectedSort] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);


//   const screenWidth = Dimensions.get('window').width;
//   const [hotelsData, setHotelsData] = useState([]);
//   const [page, setpage] = useState(2);
//   const [bookingref, setbookingref] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { address } = route.params;
//   const { date } = route.params;
//   const roomsData = [
//     {
//       id: '1',
//       imageUrl: 'https://via.placeholder.com/150',
//       type: 'Standard Twin Room',
//       details: '27 m²/291 ft²',
//       freeCancellation: true,
//       cancellationText: 'Cancellation policy',
//       price: '45',
//       breakfastPrice: '55',
//       amenities: [
//         { key: 'wifi', icon: 'wifi', text: 'Free WiFi' },
//         { key: 'ac', icon: 'ac-unit', text: 'Air conditioning' },
//         { key: 'parking', icon: 'local-parking', text: 'Parking' },
//         // Add more amenities as needed
//       ],
//     },
//     // Add more room entries as needed
//   ];

//   const RoomItem = ({ item }) => (
//     <View style={styles.roomContainer}>
//       <Image source={{ uri: item.imageUrl }} style={styles.imageStyle} />
//       <Text style={styles.roomType}>{item.type}</Text>
//       <Text style={styles.roomDetail}>{item.details}</Text>
//       {/* Amenities list */}
//       <View style={styles.amenitiesContainer}>
//         {item.amenities.map(amenity => (
//           <View key={amenity.key} style={styles.amenity}>
//             <Icon name={amenity.icon} size={16} color="#000" />
//             <Text style={styles.amenityText}>{amenity.text}</Text>
//           </View>
//         ))}
//       </View>
//       {/* Prices and booking button */}
//       <View style={styles.priceContainer}>
//         <Text style={styles.price}>{`$${item.price}`}</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Book</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
 
//   useEffect(() => {

    

//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
//         <Icon name="arrow-back" size={25} color="#007AFF" />
//       </TouchableOpacity>
//       ),
//       headerTitle: '',
//     });
//   }, [navigation]);

 


 
 


  
 
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEBED' }}>
//       {/* Status Bar */}
    
    
//       <FlatList
//     data={roomsData}
//     renderItem={({ item }) => <RoomItem item={item} />}
//     keyExtractor={item => item.id}
//   />
   
//       </SafeAreaView>
    
    
//   );
// };
  
// const styles = StyleSheet.create({
//   roomContainer: {
//     backgroundColor: '#fff',
//     padding: 10,
//     marginVertical: 8,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   imageStyle: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//   },
//   roomType: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   roomDetail: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   amenitiesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   amenity: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   amenityText: {
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#E53935',
//   },
//   button: {
//     backgroundColor: '#5392F9',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
 
// });


// export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box'; // Make sure this library is installed
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();

  const { rooms1 } = route.params;

  // Updated room data with additional details
  const roomsData = [
    {
      id: '1',
      roomName: 'Deluxe Double room (twin beds)',
      roomBeddingType: 'twin beds',
      bookHash: 'h-89bbdcea-32c2-59d4-821a-f9e3f9e5b8dd',
      meal: 'nomeal',
      showAmount: 1113.00,
      showCurrencyCode: 'MYR',
      freeCancellationBefore: null,
      roomImages: [
        'https://cdn.worldota.net/t/1024x768/ostrovok/54/bc/54bc2b84396f1125781161d28348c9428e7d7a46.png',
        'https://cdn.worldota.net/t/1024x768/content/8c/6c/8c6cde59ad9d47f8b611fde0b1e3186918f111c4.jpeg'
      ],
    },
    {
      id: '1',
      roomName: 'Deluxe Double room (twin beds)',
      roomBeddingType: 'twin beds',
      bookHash: 'h-89bbdcea-32c2-59d4-821a-f9e3f9e5b8dd',
      meal: 'nomeal',
      showAmount: 1113.00,
      showCurrencyCode: 'MYR',
      freeCancellationBefore: null,
      roomImages: [
        'https://cdn.worldota.net/t/1024x768/ostrovok/54/bc/54bc2b84396f1125781161d28348c9428e7d7a46.png',
        'https://cdn.worldota.net/t/1024x768/content/8c/6c/8c6cde59ad9d47f8b611fde0b1e3186918f111c4.jpeg'
      ],
    },
    {
      id: '1',
      roomName: 'Deluxe Double room (twin beds)',
      roomBeddingType: 'twin beds',
      bookHash: 'h-89bbdcea-32c2-59d4-821a-f9e3f9e5b8dd',
      meal: 'nomeal',
      showAmount: 1113.00,
      showCurrencyCode: 'MYR',
      freeCancellationBefore: null,
      roomImages: [
        'https://cdn.worldota.net/t/1024x768/ostrovok/54/bc/54bc2b84396f1125781161d28348c9428e7d7a46.png',
        'https://cdn.worldota.net/t/1024x768/content/8c/6c/8c6cde59ad9d47f8b611fde0b1e3186918f111c4.jpeg'
      ],
    },
    {
      id: '1',
      roomName: 'Deluxe Double room (twin beds)',
      roomBeddingType: 'twin beds',
      bookHash: 'h-89bbdcea-32c2-59d4-821a-f9e3f9e5b8dd',
      meal: 'nomeal',
      showAmount: 1113.00,
      showCurrencyCode: 'MYR',
      freeCancellationBefore: null,
      roomImages: [
        'https://cdn.worldota.net/t/1024x768/ostrovok/54/bc/54bc2b84396f1125781161d28348c9428e7d7a46.png',
        'https://cdn.worldota.net/t/1024x768/content/8c/6c/8c6cde59ad9d47f8b611fde0b1e3186918f111c4.jpeg'
      ],
    },
    

    // Add more rooms as needed
  ];

  const RoomItem = ({ item }) => (
    <View style={styles.roomContainer}>
     <SliderBox
  images={item.roomImages}
  sliderBoxHeight={200}
  dotColor="#FFf"
  inactiveDotColor="#90A4AE"
  autoplay
  circleLoop
  imageLoadingColor="#fff"
  resizeMode="cover"
  ImageComponentStyle={styles.sliderBoxImageStyle} // Apply custom styles to the image component
  paginationBoxStyle={styles.paginationBoxStyle} // Apply custom styles to the pagination box
/>
<View style={{marginLeft:20}}>


      <Text style={styles.roomType}>{item.roomName}</Text>
      <Text style={styles.detailText}>{`Bedding Type: ${item.roomBeddingType}`}</Text>
      <Text style={styles.detailText}>{`Meal Option: ${item.meal}`}</Text>
      <Text style={styles.detailText}>{`Price: ${item.showCurrencyCode} ${item.showAmount.toFixed(2)}`}</Text>
      {/* <Text style={styles.detailText}>{`Booking Reference: ${item.bookHash}`}</Text> */}
      <Text style={styles.detailText}>{`Free Cancellation: ${item.freeCancellationBefore ? 'Yes' : 'No'}`}</Text>
     
      
</View>
<TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    console.log('Rooms data:', rooms1);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Icon name="arrow-back" size={25} color="#007AFF" />
        </TouchableOpacity>
      ),
      headerTitle: '',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEBED' }}>
       <FlatList
        data={rooms1}
        renderItem={({ item }) => <RoomItem item={item} />}
        keyExtractor={item => item.id}
      /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roomContainer: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    padding: 0,
  },
  roomType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#5392F9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sliderBoxImageStyle: {
    borderRadius: 10, // Set the border radius
    marginHorizontal: 10, // Set horizontal margin
    marginTop: 10, // Set top margin
    marginBottom: 10,
    width:'95%' // Set bottom margin: ;
  },
  paginationBoxStyle: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10 // If you want to add padding inside the pagination box
  },
});

export default HomeScreen;
