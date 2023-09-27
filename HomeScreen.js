import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity,Platform ,FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './CustomHeader';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import StarRating from 'react-native-star-rating'; // Import the star rating component


import { FontSize, Padding, Color, Border, FontFamily } from "./GlobalStyles";


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
      id: '3',
      name: 'Rock Climbing',
      rating: 4.0,
      imageUrl: 'https://media.istockphoto.com/id/518208206/photo/extreme-winter-climbing.jpg?s=612x612&w=is&k=20&c=c4ha07hehjfgOD4m3BGihsJuY4__PwstomMKVjRcOjM=',
      subheading: 'Conquer challenging cliffs.'
    },
    {
      id: '4',
      name: 'Rafting',
      rating: 4.7,
      imageUrl: 'https://media.istockphoto.com/id/139701505/photo/river-rafting.jpg?s=1024x1024&w=is&k=20&c=xSw62LPfjV6KgDfVk4S9hnAD69CuayvH6yT1YCVA6FA=',
      subheading: 'Navigate thrilling rapids.'
    },
    {
      id: '5',
      name: 'Camping',
      rating: 4.4,
      imageUrl: 'https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?s=612x612&w=is&k=20&c=tN4n99cnqAAVzepKxeV4_UyuWJa9BaF542EdppPLaXs=',
      subheading: 'Camp under the stars.'
    },
    {
      id: '6',
      name: 'Mountain Climbing',
      rating: 4.6,
      imageUrl: 'https://media.istockphoto.com/id/518208206/photo/extreme-winter-climbing.jpg?s=612x612&w=is&k=20&c=c4ha07hehjfgOD4m3BGihsJuY4__PwstomMKVjRcOjM=',
      subheading: 'Conquer majestic peaks.'
    },
    {
      id: '7',
      name: 'Museum Visit',
      rating: 4.8,
      imageUrl: 'https://media.istockphoto.com/id/538358346/photo/pupils-and-teacher-on-school-field-trip-to-museum.jpg?s=612x612&w=is&k=20&c=UCps5JSN7GdLbuJXl2OCAO8K6XWbok2_Hu9jd8DxcOw=',
      subheading: 'Explore art and history.'
    },
  ];

  const datao = [
    {
      id: '1',
      name: 'Hiking',
      rating: 4.5,
      imageUrl: 'https://media.istockphoto.com/id/1141196125/photo/hiking-in-the-allgaeu-alps.jpg?s=1024x1024&w=is&k=20&c=9nqFcswWHHv8s4vWTCXf_Axp1a_V-epy-wuvEqL_-7k=',
      subheading: 'Explore scenic trails.'
    },
    {
      id: '2',
      name: 'Cycling',
      rating: 4.2,
      imageUrl: 'https://media.istockphoto.com/id/1402134774/photo/professional-road-cyclist-on-a-training-ride.jpg?s=1024x1024&w=is&k=20&c=_09YNPNzheMtTEJ0E9I68N06q_-E6vZwvQyHlz9qi8k=',
      subheading: 'Ride through beautiful landscapes.'
    },
    {
      id: '3',
      name: 'Rock Climbing',
      rating: 4.0,
      imageUrl: 'https://media.istockphoto.com/id/1141196125/photo/hiking-in-the-allgaeu-alps.jpg?s=1024x1024&w=is&k=20&c=9nqFcswWHHv8s4vWTCXf_Axp1a_V-epy-wuvEqL_-7k=',

      subheading: 'Conquer challenging cliffs.'
    },
    {
      id: '4',
      name: 'Rafting',
      rating: 4.7,
      imageUrl: 'https://media.istockphoto.com/id/1402134774/photo/professional-road-cyclist-on-a-training-ride.jpg?s=1024x1024&w=is&k=20&c=_09YNPNzheMtTEJ0E9I68N06q_-E6vZwvQyHlz9qi8k=',
      subheading: 'Navigate thrilling rapids.'
    },
    {
      id: '5',
      name: 'Camping',
      rating: 4.4,
      imageUrl: 'https://media.istockphoto.com/id/187775551/photo/group-of-friends-having-a-campfire-id187775551',
      subheading: 'Camp under the stars.'
    },
  ];
  
  
  
  const dataw = [
    {
      id: '1',
      name: 'Scuba Diving',
      rating: 4.5,
      imageUrl: 'https://media.istockphoto.com/id/498283106/photo/underwater-scuba-diver-explore-and-enjoy-coral-reef-sea-life.jpg?s=612x612&w=is&k=20&c=tb9rWKLOVLEICinkijQ5NUmJv0lvxSq2CCvWgibbg0s=',
      subheading: 'Explore the underwater world.'
    },
    {
      id: '2',
      name: 'Kayaking',
      rating: 4.2,
      imageUrl: 'https://media.istockphoto.com/id/1070181118/photo/whitewater-kayaking-extreme-kayaking-a-guy-in-a-kayak-sails-on-a-mountain-river.jpg?s=1024x1024&w=is&k=20&c=AnVNa494Y_vRwlNEnDW4fJxbi6oq0XqATZpMoyD-jl0=',
      subheading: 'Paddle through scenic waterways.'
    },
    {
      id: '3',
      name: 'Snorkeling',
      rating: 4.0,
      imageUrl: 'https://media.istockphoto.com/id/498283106/photo/underwater-scuba-diver-explore-and-enjoy-coral-reef-sea-life.jpg?s=612x612&w=is&k=20&c=tb9rWKLOVLEICinkijQ5NUmJv0lvxSq2CCvWgibbg0s=',
      subheading: 'Discover vibrant marine life.'
    },
    {
      id: '4',
      name: 'Jet Skiing',
      rating: 4.7,
      imageUrl: 'https://media.istockphoto.com/id/498283106/photo/underwater-scuba-diver-explore-and-enjoy-coral-reef-sea-life.jpg?s=612x612&w=is&k=20&c=tb9rWKLOVLEICinkijQ5NUmJv0lvxSq2CCvWgibbg0s=',
      subheading: 'Feel the thrill on the waves.'
    },
    {
      id: '5',
      name: 'Sailing',
      rating: 4.4,
      imageUrl: 'https://media.istockphoto.com/id/498283106/photo/underwater-scuba-diver-explore-and-enjoy-coral-reef-sea-life.jpg?s=612x612&w=is&k=20&c=tb9rWKLOVLEICinkijQ5NUmJv0lvxSq2CCvWgibbg0s=',
      subheading: 'Sail along picturesque coasts.'
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

    });
    console.log('Search button pressed');
  };


  const renderItem = ({ item }) => (
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
        <View style={styles.frame}>
          <View style={[styles.destinationinput, styles.frame1FlexBox]}>
            <Image
              style={styles.vectorIcon}
              resizeMode="cover"
              source={require("./assets/vector1.png")}
            />
            <TextInput 
             textAlign="left"
             placeholder="Key in your destination"
             placeholderTextColor="#999"
             value={inputValue} // Set the value of the TextInput
             onChangeText={handleInputChange}
             style={[styles.keyInYour, styles.dayTypo, { flex: 1,marginLeft:10 }]}>
            </TextInput>
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
           <TouchableOpacity style={[styles.themedropdown, styles.noofdaysShadowBox]} onPress={toggleDropdown}>
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
      </TouchableOpacity>
      
      {isDropdownOpen && (
          <View style={styles.dropdown}>
            {themes.map((theme, index) => (
              <TouchableOpacity key={index} onPress={() => selectTheme(theme)}>
                <Text style={styles.dropdownItem}>{theme}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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

<Text style={styles.headingttile}>Outdoor Activities</Text>

<FlatList
      data={datao}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true} // Set horizontal to true
    />
      <Text style={styles.headingttile}>Water Activities</Text>
      <FlatList
      data={dataw}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true} // Set horizontal to true
    />
      <Text style={styles.headingttile}> Monuments and Museums</Text>
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
    width: '45%',
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
    fontSize: FontSize.size_sm,
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
    width: '45%',
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

});

export default HomeScreen;
