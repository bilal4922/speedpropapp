import React, { useState } from 'react';
import 'react-native-get-random-values';

import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity,Platform ,FlatList, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './CustomHeader';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import StarRating from 'react-native-star-rating'; // Import the star rating component

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { FontSize, Padding, Color, Border, FontFamily } from "./GlobalStyles";
import Icon2 from 'react-native-vector-icons/FontAwesome';

import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker for date selection
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
      // Use navigation.setOptions to hide the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header for this screen
    });
  }, [navigation]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [day, setDay] = useState('1');
  const [selectedOption, setSelectedOption] = useState('');

  const datam = [
    {
      id: '1',
      name: 'Malacca Food Trip',
      rating: 3.4,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/97/83.jpg',
      subheading: 'Experience cooking local cuisine.'
    },
    {
      id: '2',
      name: 'Buffet at KL Tower',
      rating: 4,
      imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/14/b2/99/e9/atmosphere360-revolving.jpg',
      subheading: 'Experience buffet with a great view.'
    },
    {
      id: '3',
      name: 'Heritaeg Food Hunting',
      rating: 4,
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/52edcfd2e4b01873108351ab/1559650248131-Q1EGEA9NGM2IJ82FVRRZ/HOP+Lunch+Hop+Penang+George+Town+Food+Tour+1?format=1500w',
      subheading: 'Experience fantastic food from Penang.'
    },
    {
      id: '4',
      name: 'Private Hands-on Cooking',
      rating: 4.6,
      imageUrl: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/5e/7e/90.jpg',
      subheading: 'Experience cooking local cuisine.'
    },
   
  ];

  const datao = [
    {
      id: '2',
      name: "Kuala Lumpur's Legacy",
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/10/5e/52/3a.jpg',
      subheading: 'Explore Kuala Lumpur s vibrant history with outdoor activities at ionic monuments and educational visits to various museums.',
	// type of attraction: ["Outdoor Activities", "Monuments", "Museums"]
	interest: ["Fruit Valley", "Rainforest", "House of Celebrities/VVIPs"]

    },
{
      id: '4',
      name: 'Aqua Escapeds in KL',
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/38/b7/2c.jpg',
      subheading: 'Dive into water activities at KL s esteemed parks - from peaceful boat rides to refreshing dips in large, sparkling pools.',
	// type of attraction: ["Water Activities", "Parks"]
	interest: ["Rivers", "Water Park", "Forest Park"]

    },
{
      id: '5',
      name: 'Serene Spaces in KL',
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/09/91/90/65.jpg',
      subheading: 'Discover the tranquility of KL s lush parks and the spiritual calm at revered worship sites for a moment of peace.',
	// type of attraction: ["Worship Places", "Parks"]
	interest: ["Theme Park", "Nature Park", "Forest Park"]

    },
{
      id: '6',
      name: 'Heritage & Harmony in KL',
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/34/bf/c6.jpg',
      subheading: 'Visit historic monuments, intriguing museums and sacred worship places to understand the cultural facric of Kuala Lumpur',
	// type of attraction: ["Monuments & Museums", "Worship Places"]
	interest: ["Galleries", "Memorial", "Palace"]

    },
{
      id: '7',
      name: 'Active explorations on KL',
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2d/2f/c9.jpg',
      subheading: 'Indulge in exhilarating outdoor activities while discovering KL s unique place of interest.',
	// type of attraction: ["Outdoor Activities", "Place of Interest"]
	interest: ["Food Outlet", "Shopping", "Hop On Hop Off", "Walking Tour", "Gardens"]

    },
{
      id: '8',
      name: 'Past & Present in Green',
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/df/b9/01.jpg',
      subheading: 'Immerse yourself in a day of knowledge and nature as you visit KL s monuments, museums, and beautiful parks.',
	// type of attraction: ["Monuments", "Museums", "Parks"]
	interest: ["Central Marks", "Eco Park Palace", "Memorial", "Theme Park"]

    },
{
      id: '9',
      name: "KL's Sea and Sightseeing",
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/e6/5f/d5.jpg',
      subheading: 'Experience KL s exciting water activities and visit city s popular attractions to create lasting memories.',
	// type of attraction: ["Water Activities", "Place of Interest"]
	interest: ["Diving Beach", "Zoo", "Aquaria", "Science Centre"]

    },
{
      id: '10',
      name: "KL's Active Aqua Adventure",
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/a3/48/84.jpg',
      subheading: 'Experience the best of both worlds with Kuala Lumpur s outdoor and water activities, a perfect blend of adventure and fun.',
	// type of attraction: ["Outdoor Activities", "Water Activities"],
	interest: ["Rainforest", "Island", "Waterfall", "Diving"]

    },
{
      id: '11',
      name: 'Outdoor Oasis of KL',
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/04/da/44.jpg',
      subheading: 'Unwind amidst nature with engaging outdoor activities in the city s most loved parks.',
	// type of attraction: ["Outdoor Activities", "Parks"]
	interest: ["Hills", "Recreational Forest", "Nature Park", "Water Park"]

    },
{
      id: '12',
      name:  "sKL's Green & Vibrant Visits",
      rating: 4.0,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/04/da/44.jpg',
      subheading: 'Enjoy a day out at KL s parks and explore city s notable places of interest, all in one itinerary.',
	// type of attraction: ["Place of Interest", "Parks"]
	interest: ["Water Park", "Wetland Park", "Railway Station", "Health Places like SPAs", "Entertainment Places like Pub/Club/Cafes"]

    },


    // {
    //   id: '1',
    //   name: 'Private Tour Kuala Lumpur',
    //   rating: 4.0,
    //   imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/09/dd/1b/4d.jpg',
    //   subheading: 'Get a bird s-eye view over Kuala Lumpur.'
    // },
    // {
    //   id: '2',
    //   name: 'Private Cameron Tour',
    //   rating: 4,
    //   imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/37/3d/ac.jpg',
    //   subheading: 'Enjoy the flexibility of independent travel.'
    // },
    // {
    //   id: '3',
    //   name: 'Waterfall at Batu Caves',
    //   rating: 4,
    //   imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/7e/e9/71.jpg',
    //   subheading: 'Have a refreshing splash.'
    // },
    // {
    //   id: '4',
    //   name: 'Glowing Kuala Selangor',
    //   rating: 4.6,
    //   imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/58/19/9f.jpg',
    //   subheading: 'Experience the natural  phenomenon.'
    // },
   
  ];
  
  
  const handleNavigate = (urlmain) => {
    // Your navigation logic here
    navigation.navigate('web', { urlmain }); // Pass the urlmain parameter to the 'web' screen
    console.log('Search button pressed');
  };
  const dataw = [
    {
      id: '1',
      name: 'Guided Rock Climbing',
      rating: 3.4,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/3a/55/03.jpg',
      subheading: 'Climb the rocks of Batu Caves.'
    },
    {
      id: '2',
      name: 'Train Trip to Dabong',
      rating: 4,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/KTM_class_61.jpg',
      subheading: 'Hop on a train to venture Dabong.'
    },
    {
      id: '3',
      name: 'Guided Snorkeling Trip',
      rating: 4,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/7e/e9/71.jpg',
      subheading: 'Discover Sabah s sea safely.'
    },
    {
      id: '4',
      name: 'Scuba Diving',
      rating: 4.6,
      imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/8f/a8/8c.jpg',
      subheading: 'Explore the sea with guidance.'
    },
   
  ];


  const [inputValue, setInputValue] = useState('');

  // Function to handle changes in the TextInput value
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  // Initialize selected date state

//   const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize selected date state
//   const [showPicker, setShowPicker] = useState(false);

//   const onDateChange = (event, selected) => {
//     const currentDate = selected || selectedDate;
//     setShowPicker(Platform.OS === 'ios'); // Hide the date picker on iOS
//     setSelectedDate(currentDate);
//     hideDatePicker();
//   };

//   const showDatePicker = () => {
//     setShowPicker(true);
//   };

//   const hideDatePicker = () => {
//     setShowPicker(false);
//   };

const [selectedDate, setSelectedDate] = useState(new Date());
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
  setSelectedDate(date);
  hideDatePicker();
};
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Theme');

  const themes = ['Theme', 'Umrah', 'Balik Kampung'];
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectTheme = (theme) => {
    setSelectedTheme(theme);
    setDropdownOpen(false);
  };




  const [isDropdownOpendays, setDropdownOpendays] = useState(false);
  const [selectedThemedays, setSelectedThemedays] = useState('Day 1');
  const [selectedThemedays1, setSelectedThemedays1] = useState('1');

  const themesdays = ['Day 1', 'Day 2', 'Day 3','Day 4','Day 5'];
  const toggleDropdowndays = () => {
    setDropdownOpendays(!isDropdownOpendays);
  };

  const selectedThemeday = (themesdays) => {
    setSelectedThemedays(themesdays);
    setDropdownOpendays(false);
  };


  // Function to handle address input change
  const handleChange = (text) => {
    setAddress(text);
  };

 
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  // Function to handle day input change
  const handleInputChange1 = (text) => {
    setDay(text);
  };

  // Function to handle theme selection
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  // Function to handle navigation when the "Search" button is pressed
  const handleNavigate689 = () => {
    // Your navigation logic here
    title="Go to Details"
     navigation.navigate('Details', {
      address: inputValue,
      day: selectedThemedays1,
      date: selectedDate,
id:'ffff'


    });
    console.log('Search button pressed');
  };
  const handleItemClick = (item) => {
 //   Alert.alert(item.name)
    // Perform your action when an item is clicked
  
    navigation.navigate('Details', {
     address: 'kuala lumpur',
     day: selectedThemedays1,
     date: selectedDate,
     id:item.id

   });
    // You can do any other action you want here
  };

  const renderItem = ({ item }) => (
    
    <TouchableOpacity onPress={() => handleItemClick(item)}>

    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      
      <Text style={styles.subheading}>{item.subheading}</Text>
      <View style={styles.ratingContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={item.rating}
            starSize={20}
            fullStarColor="gold"
            emptyStarColor="gold"
          />
          </View>
    </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <CustomHeader />
      <ScrollView style  ={{width:'100%',height:1600, backgroundColor:'#fff'}}>

      
      <View style={styles.container}>
        <Image
          source={require('./assets/Backdrop.png')} // Replace with your image source
          style={styles.mainImage}
        />
        <Text style={styles.heading}>Personalize Your Travel Plans with AI</Text>


        <View style={styles.dialog}>
       
      <View style={styles.searchbar}>
      <View style={styles.containerr}>
  <View style={styles.transportContainer}>
    <View style={[styles.transportItem, { alignItems: 'center' }]}>
      <TouchableOpacity
        onPress={() => {
          const urlmain = 'http://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fhotels';
          handleNavigate(urlmain);
        }}
        style={{ alignItems: 'center' }}
      >
        <Icon name="bed" color="#202756" size={25} style={{ marginRight: 4 }} />
        <Text style={[styles.activityText, { textAlign: 'center' }]} >Hotel</Text>
      </TouchableOpacity>
    </View>

    <View style={[styles.transportItem, { alignItems: 'center', justifyContent: 'center' }]}>
  <TouchableOpacity
    onPress={() => {
      const urlmain = 'https://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fflights';
      handleNavigate(urlmain);
    }}
    style={{ alignItems: 'center' }} // Add this line to center contents
  >
    <Icon name="airplanemode-active" color="#202756" size={25} style={styles.icon} />
    <Text style={[styles.activityText, { textAlign: 'center' }]}>Flight</Text>
  </TouchableOpacity>
</View>

    <View style={[styles.transportItem, { alignItems: 'center' }]}>
      <TouchableOpacity
        onPress={() => {
          const urlmain = 'https://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fcars';
          handleNavigate(urlmain);
        }}
        style={{ alignItems: 'center' }}
      >
        <Icon2 name="car" color="#202756" size={25} style={styles.icon} />
        <Text style={[styles.activityText, { textAlign: 'center' }]} >Car</Text>
      </TouchableOpacity>
    </View>

    <View style={[styles.transportItem, { alignItems: 'center' }]}>
      <TouchableOpacity
        onPress={() => {
          const urlmain = 'https://online.ktmb.com.my';
          handleNavigate(urlmain);
        }}
        style={{ alignItems: 'center' }}
      >
        <Icon name="directions-train" color="#202756" size={25} style={styles.icon} />
        <Text style={[styles.activityText, { textAlign: 'center' }]} >Train</Text>
      </TouchableOpacity>
    </View>

    <View style={[styles.transportItem, { alignItems: 'center' }]}>
      <TouchableOpacity
        onPress={() => {
          const urlmain = 'https://gohub.com.my';
          handleNavigate(urlmain);

        }}
        style={{ alignItems: 'center' }}
      >
        <Icon name="directions-bus" color="#202756" size={25} style={styles.icon} />
        <Text style={[styles.activityText, { textAlign: 'center' }]} >Bus</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>




        <View style={styles.frame}>
          <View style={[styles.destinationinput, styles.frame1FlexBox]}>
            <Image
              style={styles.vectorIcon}
              resizeMode="cover"
              source={require("./assets/vector1.png")}
            />
           

       
           
           <TextInput 
  textAlign="left"
  placeholder="Key in your destinationn"
  placeholderTextColor="#999"
  value={inputValue}
  onChangeText={handleInputChange}
  style={[styles.keyInYour, styles.dayTypo, { flex: 1, marginLeft: 10, height: 20 }]}
/>
            
       
      
          </View>
          <View style={[styles.frame1, styles.frame1FlexBox]}>
            <View style={[styles.datepicker, styles.frame1FlexBox]}>
              <Image
                style={styles.vectorIcon2}
                resizeMode="cover"
                source={require("./assets/vector2.png")}
              />


<Text
        style={[styles.keyInYour, styles.dayTypo, { flex: 1, marginLeft: 10 }]}
        onPress={showDatePicker}
      >
        {selectedDate.toLocaleDateString()}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )} */}

           
            </View>
            <TouchableOpacity style={[styles.noofdays, styles.noofdaysShadowBox]} onPress={toggleDropdowndays}>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <Image
            style={styles.vectorIcon2}
            resizeMode="cover"
            source={require("./assets/vector2.png")}
          />
          <Text style={[styles.day, styles.dayTypo ,{ flex: 1,marginLeft:10 }]}>{selectedThemedays}</Text>
        </View>
        <Image
          style={styles.iconamoonarrowUp2Light}
          resizeMode="cover"
          source={require("./assets/iconamoonarrowup2light.png")}
        />
      </TouchableOpacity>

     
           
          </View>
          {isDropdownOpendays && (
          <View style={styles.dropdown1}>
          {themesdays.map((theme, index) => (
  <TouchableOpacity key={index} onPress={() => {
    setSelectedThemedays1(index);
    selectedThemeday(theme);
  }}>
    <Text style={styles.dropdownItem1}>{theme}</Text>
  </TouchableOpacity>
))}
          </View>
        )}
        </View>
        <View style={styles.frame3}>
            {/* <TouchableOpacity style={[styles.themedropdown, styles.noofdaysShadowBox]} onPress={toggleDropdown}>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Image
            style={styles.faSolidumbrellaBeachIcon}
            resizeMode="cover"
            source={require("./assets/fasolidumbrellabeach.png")}
          />
          <Text style={[styles.theme, styles.dayTypo]}>{selectedTheme}</Text>
        </View>
        <Image
          style={styles.iconamoonarrowUp2Light}
          resizeMode="cover"
          source={require("./assets/iconamoonarrowup2light.png")}
        />
      </TouchableOpacity>  */}
     
      {/* {isDropdownOpen && (
          <View style={styles.dropdown}>
            {themes.map((theme, index) => (
              <TouchableOpacity key={index} onPress={() => selectTheme(theme)}>
                <Text style={styles.dropdownItem}>{theme}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}  */}
          <View style={styles.searchbutton}>
            <Text   onPress={handleNavigate689} style={[styles.search, styles.dayTypo]}>SEARCH</Text>
          </View>
        </View>
      </View>

      
    </View>


       
      </View>
      
      <Text style={styles.headingttile}>
  <Text style={{ color: '#A8232E' }}>Discover More:</Text>{' '}
  <Text style={{ color: '#102694' }}>Inspirational Ideas Co-Created by Fellow Travelers and Professionals</Text>
</Text>

<Text style={styles.headingttile}>Featured</Text>

<FlatList
      data={datao}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true} // Set horizontal to true
    />
      <Text style={styles.headingttile}>Adventures and Sports</Text>
      <FlatList
      data={dataw}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true} // Set horizontal to true
    />
      <Text style={styles.headingttile}>Food Discovery</Text>
      <FlatList
      data={datam}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true} // Set horizontal to true
    />
     
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerr: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent:'center',
  },
  inputContainer: {
    flexDirection: 'row', // Place components horizontally
    alignItems: 'center', // Center components vertically
    borderWidth: 2, // Border width (you can adjust this as needed)
    borderColor: '#B1BDCC', // Border color
    borderRadius: 10, // Border radius
    paddingHorizontal: 20, // Left and right padding
    height: 40, // Input height (adjust as needed)
  },
  searchIcon: {
    color: '#202756', // Icon color
    fontSize: 30, // Icon size
  },
  addressInput: {
    backgroundColor: 'transparent', // To make the background transparent
    flex: 1, // Take up remaining horizontal space
    color: '#202756', // Text color
    fontSize: 16, // Text font size
  },
  mainImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 28,
    fontFamily: 'your-custom-font-semibold-italic',
    fontStyle: 'italic',
    fontWeight: 'normal',
    marginTop: -180,
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    color: '#010066',
  },


  headingttile: {
    fontSize: 18,
    fontFamily: 'your-custom-font-semibold-italic',
    fontStyle: 'italic',
    fontWeight: 'normal',
   marginTop:20,
   
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 50,
    color: '#010066',
  },

  addressInputContainer: {
    backgroundColor:'#FFFFFF',
    borderWidth: 2,  // Golden border width
    borderColor: '#FFB116',  // Golden border color
    borderRadius: 20,  // Border radius to make it rounded
     // Padding on the top and bottom (default padding for left and right)
    marginRight:20,  // Additional padding on the right: ;
    flexDirection: 'row',
   
    marginLeft: 20,
    marginTop:40,
    height: 255,
    width: '90%',
  },
  searchIcon: {
    marginRight: 10,
  },
  addressInput: {
    flex: 1,
    fontSize: 20,
    borderColor: '#00a19a',
    borderBottomWidth: 1,
  },
  autocompleteContainer: {
    // Style your autocomplete container as needed
  },
 

  frame1FlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  dayTypo: {
    // textAlign: "left",
    fontSize: FontSize.size_sm,
  },
  noofdaysShadowBox: {
    paddingBottom: Padding.p_2xs,
    paddingTop: Padding.p_2xs,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: Color.colorLightsteelblue,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  frameFlexBox: {
    flexDirection: "row",
    height: 17,
    overflow: "hidden",
  },
  vectorIcon: {
    width: 19,
    height: 19,
  },
  keyInYour: {
    color: Color.colorDarkslateblue_300,
    fontFamily: FontFamily.montserratRegular,
    letterSpacing: -0.2,
    // textAlign: "right",
    fontSize: FontSize.size_sm,
  },
  destinationinput: {
    paddingHorizontal: 20,
    paddingVertical: Padding.p_mid,
    borderWidth: 0.4,
    borderColor: Color.colorLightsteelblue,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "space-between",
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: Color.colorWhite,
    alignSelf: "stretch",
  },
  vectorIcon1: {
    width: 15,
    height: 17,
  },
  datepicker: {
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_2xs,
    width: '55%',
    borderWidth: 0.4,
    borderColor: Color.colorLightsteelblue,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "space-between",
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: Color.colorWhite,
  },
  vectorIcon2: {
    width: 14,
    height: 17,
  },
  day: {
    marginLeft: 22,
    color: Color.colorDarkslateblue_300,
    fontFamily: FontFamily.montserratRegular,
    letterSpacing: -0.2,
    textAlign: "left",
    fontSize: 12,
  },
  frame2: {
    width: 72,
    height: 17,
    alignItems: "center",
  },
  iconamoonarrowUp2Light: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  noofdays: {
    paddingLeft: Padding.p_mid,
    width: '42%',
  },
  frame1: {
    marginTop: 14,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frame: {
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  faSolidumbrellaBeachIcon: {
    width: 18,
    height: 15,
    overflow: "hidden",
  },
  theme: {
    marginLeft: 18,
    color: Color.colorDarkslateblue_300,
    fontFamily: FontFamily.montserratRegular,
    letterSpacing: -0.2,
    textAlign: "left",
    fontSize: FontSize.size_sm,
  },
  frame4: {
    width: 85,
    height: 17,
  },
  themedropdown: {
    paddingLeft: Padding.p_mini,
    alignSelf: "stretch",
  },
  search: {
    letterSpacing: 1,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorMidnightblue_100,
    textAlign: "left",
    fontSize: FontSize.size_sm,
  },
  searchbutton: {
    backgroundColor: Color.colorOrange,
    height: 34,
    alignSelf:'center',
    justifyContent: "center",
    marginTop: 16,
    width: 181,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
  frame3: {
    alignItems: "flex-end",
    marginTop: 15,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  searchbar: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGray_100,
    borderColor: Color.colorOrange,
    borderWidth: 2,
    paddingLeft: 30,
    paddingTop: 28,
    paddingRight: 31,
    paddingBottom: 22,
    justifyContent: "flex-end",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    alignSelf: "stretch",
  },
  dialog: {
   marginTop: 40,
    width: "90%",
    paddingHorizontal: 0,
    
    
    
    backgroundColor: 'transparent',
  },
  dropdown1: {
    
    top: 8, // Adjust this value as needed to position the dropdown correctly
    width: '100%',
    textAlign:'right', // Adjust the width as needed
    backgroundColor: 'white',
    elevation: 2, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow (iOS)
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 4, // Add border radius for a rounded look
    zIndex: 1, // Ensure the dropdown is above other elements
  },
  dropdown: {
    
    top: 8, // Adjust this value as needed to position the dropdown correctly
    width: '100%', // Adjust the width as needed
    backgroundColor: 'white',
    elevation: 2, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow (iOS)
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 4, // Add border radius for a rounded look
    zIndex: 1, // Ensure the dropdown is above other elements
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    
  },
  dropdownItem1: {
    padding: 10,
    fontSize: 16,
    textAlign: 'right',
    marginRight:30,
  },

  item: {
    width: 270, // Width of each item
    marginRight: 16, // Margin between items
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: 'gray',
  },
  subheading: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  ratingContainer: {
    width: 100, // Limit the width of the StarRating component
  },
  transportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  activityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#202756',
  },
  activityDetailContainer: {
    flex: 1,
  
    // This will make the container take up the available space
  },
  transportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  transportItem: {
    flex: 1, // Ensure equal width for each item
  },

});

export default HomeScreen;

