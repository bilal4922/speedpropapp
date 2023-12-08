import { View, Text, Button, SafeAreaView, StatusBar, StyleSheet,TextInput, FlatList,Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const HomeScreen = () => {
  const navigation = useNavigation();
 
 const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid',},
    {label: 'Barcelona', value: 'barcelona'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome'},

    {label: 'Finland', value: 'finland'}
  ]);


  const data = [
    {
      id: '1',
      imageUrl: 'https://c0.wallpaperflare.com/preview/281/900/948/malaysia-johor-bahru.jpg',
      name: 'Location 1',
      stars: 4,
      location: 'Johor Bahru, Malaysia',
      reviews: '200 Reviews',
    },
    {
      id: '1',
      imageUrl: 'https://c0.wallpaperflare.com/preview/281/900/948/malaysia-johor-bahru.jpg',
      name: 'Location 1',
      stars: 4,
      location: 'Johor Bahru, Malaysia',
      reviews: '200 Reviews',
    },
    {
      id: '1',
      imageUrl: 'https://c0.wallpaperflare.com/preview/281/900/948/malaysia-johor-bahru.jpg',
      name: 'Location 1',
      stars: 4,
      location: 'Johor Bahru, Malaysia',
      reviews: '200 Reviews',
    },
    {
      id: '1',
      imageUrl: 'https://c0.wallpaperflare.com/preview/281/900/948/malaysia-johor-bahru.jpg',
      name: 'Location 1',
      stars: 4,
      location: 'Johor Bahru, Malaysia',
      reviews: '200 Reviews',
    },
    // Add more items to the data array as needed
  ];
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Back"
          color="#007AFF" // You can customize the color
        />
      ),
    });
  }, [navigation]);


  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => navigation.navigate('hotel2', { item })}
  >
    <View style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{ uri: item.imageUrl }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.starsText}>{`${item.stars} Stars`}</Text>
        </View>
        <Text style={styles.locationText}>{item.location}</Text>
        <Text style={styles.reviewsText}>{item.reviews}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Status Bar */}
    
    
      <View style={styles.container1}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        // Add any additional search bar props or styling as needed
      />

      <Text style={styles.dateText}>
        Sat, 11 Nov - Tue, 14 Nov • 4 Guests
      </Text>
    </View>
      <View style={styles.container}>
      <View style={styles.dropdownContainer}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.picker}

        
        
        
        // mode="BADGE"
        // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />
      </View>

      <View style={styles.dropdownContainer}>
        <DropDownPicker
         open={open}
         value={value}
         items={items}
         setOpen={setOpen}
         setValue={setValue}
         setItems={setItems}
         style={styles.picker}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.picker}
        />
      </View>
    

    </View>
    <FlatList
    style={{margin:30}}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
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

  container1: {
    height: 100,
    padding: 16,
    backgroundColor: '#5392F9', // Set your desired background color
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemContainer: {
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  starsText: {
    color: 'white',
  },
  locationText: {
    color: 'white',
    fontSize: 14,
  },
  reviewsText: {
    color: 'white',
    fontSize: 14,
  },
});


export default HomeScreen;
