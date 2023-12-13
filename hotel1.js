import { View, Text, Button, SafeAreaView, StatusBar, StyleSheet,TextInput, FlatList,Image,TouchableOpacity, Dimensions,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Rating, AirbnbRating } from 'react-native-ratings';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'react-native-loading-placeholder';
import { fetchData } from './redux/actions';
import AnimatedLoader from "react-native-animated-loader";
const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
 
 const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [items, setItems] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid',},
    {label: 'Barcelona', value: 'barcelona'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome'},

    {label: 'Finland', value: 'finland'}
  ]);

  const screenWidth = Dimensions.get('window').width;
  const [hotelsData, setHotelsData] = useState([]);
  const [page, setpage] = useState(2);
  const [bookingref, setbookingref] = useState('');
  const [loading, setLoading] = useState(true);
  const { address } = route.params;
  const { date } = route.params;
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://halaltravel.ai/ht/api/v1/hotel/search/byPlaceName', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbm1oZzE5OTBAZ21haWwuY29tIiwidXNlcklkIjoxLCJpYXQiOjE3MDIzNzEyNjYsImV4cCI6MTcwMjk3NjA2Nn0.AgpWEvXrt1Gx4AqQHk8JiqsNK7Tsg1W3KvRsAtrYc5RAJsrzTc-V8JsWMMAZ2Ky3DXFt3NrEapB3ZUkWecFy-g'
            // Add any other headers required by the API
          },
          body: JSON.stringify({
            query: "Penang",
            language: "en",
            checkin: "2023-12-15",
            checkout: "2023-12-17",
            currency: "MYR",
            adults: 2,
            children: []
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const json = await response.json();
        setHotelsData(json.elements);
        setbookingref(json.searchReference)
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    };
  
    fetchData();

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

  const fetchDatareference = async () => {
    try {
      const response = await fetch('https://halaltravel.ai/ht/api/v1/hotel/search/bySearchReference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbm1oZzE5OTBAZ21haWwuY29tIiwidXNlcklkIjoxLCJpYXQiOjE3MDIzNzEyNjYsImV4cCI6MTcwMjk3NjA2Nn0.AgpWEvXrt1Gx4AqQHk8JiqsNK7Tsg1W3KvRsAtrYc5RAJsrzTc-V8JsWMMAZ2Ky3DXFt3NrEapB3ZUkWecFy-g'
          // Add any other headers required by the API
        },
        body: JSON.stringify({
          "searchReference" : bookingref,
        "language" : "en",
         "pageNumber" :page
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      // setHotelsData(json.elements);
      // if (page === 2) {
      //   setHotelsData(json.elements);
      // } else {
        setHotelsData(prevHotels => [...prevHotels, ...json.elements]);
     // }
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    // Format the date and the next day
    const startDate = date.toLocaleDateString('en-US', options);
    const endDate = new Date(date);
    endDate.setDate(date.getDate() + 1);
    const endDateFormatted = endDate.toLocaleDateString('en-US', options);

    return `${startDate} - ${endDateFormatted}`;
  };

  const handleLoadMore = () => {
    if (!loading) {
      setpage(prevPage => prevPage + 1);
      fetchDatareference(page + 1);
    }
  };

  // Function to refresh the list (pull to refresh)
  const handleRefresh = () => {
  //  setIsRefreshing(true);
  //  setPage(1);
   // fetchData();
  };


  // const hotelsData = [
  //   {
  //     id: '1',
  //     hotelName: 'Profolio Straits Quay',
  //     hotelImage: 'https://cdn.worldota.net/t/1024x768/content/6a/c6/6ac6d47ee69433e1d26ce58b67f7349363094313.jpeg',
  //     hotelRating: 3,
  //     hotelAddress: '3H-1-2, Straits Quay, Tanjung Tokong',
  //     showAmount: 603.00,
  //     showCurrencyCode: 'MYR',
  //     roomName: '1 Bedroom Standard Double room (full double bed) (queen size bed, kitchen)',
  //     meal: 'nomeal',
  //     freeCancellationBefore: null
  //   },
  //   // ... more hotel data
  // ];
  
  const PlaceholderHotelItem1 = () => (
    <View style={styles.container22}>
     <Image  style={styles.image} /> 
    <View style={styles.details}>
    <View style={styles.header}>
        <Text style={styles.name}></Text>
        <View style={{ width: 100, justifyContent: 'flex-start' }}>

        <Rating
          imageSize={20}
          readonly
          startingValue={hotelData.hotelRating}
          ratingCount={5}
          
 
          // style={{ width:200 }}
        />
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Icon name="location-on" size={20} color='#5392F9' />
        <Text style={styles.location}></Text>
      </View>
   
      <View style={styles.mealBoxNotIncluded}>
      <Text style={styles.rating}>
          {`5 / 5`}
        </Text>
        {/* <Text style={styles.reviews}>{`${hotelData.reviews} Reviews`}</Text> */}
      </View>
      {/* <View style={styles.amenities}>
        {hotelData.amenities.map((amenity, index) => (
          <Text key={index} style={styles.amenity}>{amenity}</Text>
        ))}
      </View> */}
      <View style={styles.infoRow}>
        <View style={hotelData.meal === 'nomeal' ? styles.mealBoxNotIncluded : styles.mealBoxIncluded}>
          <Text style={styles.mealText}>
            {hotelData.meal === 'nomeal' ? 'Breakfast not included' : 'Breakfast included'}
          </Text>
        </View>
        <Text style={styles.price}></Text>
      </View>
    </View>
  </View>
  
  );
  const PlaceholderHotelItem = () => (
    <View style={styles.container22}>
      <Placeholder
        Animation={Fade}
        Left={() => <PlaceholderMedia style={styles.image} />}
      >
        <PlaceholderLine width={80} style={styles.namePlaceholder} />
        <PlaceholderLine style={styles.ratingPlaceholder} />
        <PlaceholderLine width={30} style={styles.locationPlaceholder} />
        <PlaceholderLine style={styles.mealBoxPlaceholder} />
        <PlaceholderLine style={styles.pricePlaceholder} />
      </Placeholder>
    </View>
  );

  const HotelItem = ({ hotelData }) => (
    <View style={styles.container22}>
     <Image source={{ uri: hotelData.hotelImage }} style={styles.image} /> 
    <View style={styles.details}>
    <View style={styles.header}>
        <Text style={styles.name}>{hotelData.hotelName}</Text>
        <View style={{ width: 100, justifyContent: 'flex-start' }}>

        <Rating
          imageSize={20}
          readonly
          startingValue={hotelData.hotelRating}
          ratingCount={5}
          
 
          // style={{ width:200 }}
        />
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Icon name="location-on" size={20} color='#5392F9' />
        <Text style={styles.location}>{hotelData.hotelAddress}</Text>
      </View>
   
      <View style={styles.mealBoxNotIncluded}>
      <Text style={styles.rating}>
          {`${hotelData.hotelRating} / 5`}
        </Text>
        {/* <Text style={styles.reviews}>{`${hotelData.reviews} Reviews`}</Text> */}
      </View>
      {/* <View style={styles.amenities}>
        {hotelData.amenities.map((amenity, index) => (
          <Text key={index} style={styles.amenity}>{amenity}</Text>
        ))}
      </View> */}
      <View style={styles.infoRow}>
        <View style={hotelData.meal === 'nomeal' ? styles.mealBoxNotIncluded : styles.mealBoxIncluded}>
          <Text style={styles.mealText}>
            {hotelData.meal === 'nomeal' ? 'Breakfast not included' : 'Breakfast included'}
          </Text>
        </View>
        <Text style={styles.price}>{`${hotelData.showCurrencyCode} ${hotelData.showAmount.toFixed(2)}`}</Text>
      </View>
    </View>
  </View>
  );
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEBED' }}>
      {/* Status Bar */}
    
    
      <View style={styles.container1}>
      <Text
        style={styles.searchBar}
        placeholder="Penang"
        // Add any additional search bar props or styling as needed
      >{address}</Text>

      <Text style={styles.dateText}>
      {formatDate(new Date(date))}• 2 Guests
      </Text>
    </View>
      <View style={styles.container}>
    

    </View>
  
    <FlatList
    data={hotelsData}
    renderItem={({ item }) => <HotelItem hotelData={item} />}
    keyExtractor={item => item}
    onEndReached={handleLoadMore}
    onEndReachedThreshold={0.5} // Load more when the user has scrolled 50% of the list
    refreshing={isRefreshing}
    onRefresh={handleRefresh}
  />
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
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
    height:30 
  },
  dropdown: {
    height: 30,
  },
  picker: {
    height: 30,
    backgroundColor: '000',
  },

  

  container22: {
    width: '95%',
    marginLeft:10,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 3, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.1, // for iOS
    shadowRadius: 2, 
    borderRadius:10,
    marginBottom:16 ,
    
    // for iOS
  },
  image: {
    borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
    width: '100%',
    height: 162, // Set a fixed height or make it dynamic
  },
  details: {
    padding: 10,
  },
  name: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  location: {
    color: 'gray',
    marginBottom: 5,
  },
  ratingReviews: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    fontWeight: 'bold',
    
   
  },
  reviews: {
    color: 'gray',
  },
  amenities: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  amenity: {
    marginRight: 10,
    color: 'gray',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  container1: {
    height: 100,
    padding: 16,
    backgroundColor: '#5392F9', // Set your desired background color
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white' ,
    paddingLeft: 10,
  },
  searchBar: {
    height: 40,
    fontSize: 26,
   
    marginBottom: 5,
    paddingLeft: 10,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
   
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 5, // Adjust the space between the icon and the text as needed
    color: '#5392F9',
  },
  mealBoxIncluded: {
    borderWidth: 1,
    borderColor: '#ccc', // Adjust color as needed
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    alignSelf: 'flex-start', // Align to the start of the text line
  },
  mealBoxNotIncluded: {
    borderWidth: 1,
    borderColor: '#ccc', // Adjust color as needed
    backgroundColor: '#f8f8f8', // Slightly grey background to indicate 'not included'
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    alignSelf: 'flex-start', // Align to the start of the text line
  },
  mealText: {
    textAlign: 'center',
    color: '#333', // Adjust text color as needed
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5, // Adjust as needed
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default HomeScreen;
