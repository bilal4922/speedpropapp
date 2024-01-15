import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
   ActivityIndicator,
   ImageBackground


} from 'react-native';
import {
  Padding,
  Color,
  Border,
  FontSize,
  FontFamily,
} from "./GlobalStylessignin";
import  Icon  from 'react-native-vector-icons/MaterialIcons';


import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome library

const BusSearchScreen = ({ navigation }) => {
  const [originList, setOriginList] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedOrigincode, setSelectedOrigincode] = useState('');
  const [selecteddes, setSelectedes] = useState('');
  const [selectedescode, setSelecteddescode] = useState('');
  var originCode =''
  const [destination, setDestination] = useState('');
 // const [departureDate, setDepartureDate] = useState('');
 // const [returnDate, setReturnDate] = useState('');
  const [showOriginList, setShowOriginList] = useState(false);
  const [showdestinationList, setShowdestinationList] = useState(false);
  const [destinationList, setDestinationList] = useState([]);
  const [filteredOrigins, setFilteredOrigins] = useState([]);
  const [filteredOrigins1, setFilteredOrigins1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [ref, setref] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbm1oZzE5OTAwQGdtYWlsLmNvbSIsInVzZXJJZCI6NDUsImlhdCI6MTcwNTM1MTY0MywiZXhwIjoxNzA1OTU2NDQzfQ.-bQDpD1vHHcIrYdZi9adix0I6o0zCasW7NlgufmtqTtaUT9LVR7F4mvUa-mBX6ycE-Jyp5cXSgRuVK1DE___0Q';

  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDater, setSelectedDater] = useState(null);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  useEffect(() => {
    

    setLoading(true);
    // Define the request payload
    const requestData = {
      // Include any necessary data in the request body
    };
  
    // Call the API with a POST request and include the bearer token in the header
    fetch('https://halaltravel.ai/ht/api/v1/bus/search/origin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
    //    console.log("aaaaa", data);
        setOriginList(data.data.stateList);
        setLoading(false);
      //  fetchDestinationList()

      })
      .catch(error => console.error('Error fetching origin data:', error));
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Icon name="arrow-back" size={25} color="#007AFF" />
        </TouchableOpacity>
        ),
        headerTitle: '',
      });
    }, [navigation]);
  const fetchDestinationList = async () => {
    try {
      const response = await fetch('https://halaltravel.ai/ht/api/v1/bus/search/destination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
         // originCode,
          originCode : originCode,
          originType: 'terminal',
          destination: '',
        }),
      });

      const result = await response.json();
      console.log("aaaaap", result,originCode);

      // if (result.status) {
        setDestinationList(result);
        booking();
      // } else {
      //   // Handle error response
      //  // console.error(result.mes);
      // }
    } catch (error) {
      // Handle fetch error
      console.error(error);
    }
  };

  const booking = async () => {
    try {
      const response = await fetch('https://halaltravel.ai/ht/api/v1/bus/booking/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
         // originCode,
          
        }),
      });

      const result = await response.json();
      console.log("pppp", result.busBookingReferenceNo);
      setref(result.busBookingReferenceNo)

      // if (result.status) {
      //  setDestinationList(result);
      // } else {
      //   // Handle error response
      //  // console.error(result.mes);
      // }
    } catch (error) {
      // Handle fetch error
      console.error(error);
    }
  };

  // const handleOriginSelect = (name) => {
  //   // Update state with the selected origin name and hide the list
  //   setSelectedOrigin(name);
  //   setShowOriginList(false);
  // };

  const handleSelectedOriginPress = () => {
    // Show/hide the list on "Selected Origin" press
    setShowOriginList(!showOriginList);
  };
  const renderTerminalItem = ({ item }) => (
    <TouchableOpacity style={styles.terminalItem} onPress={() => handleTerminalPress(item)}>
      <Text>{item.mdTerminalNameFrom}</Text>
    </TouchableOpacity>
  );

  const handleTerminalPress = (terminal) => {
    // Handle the selection of the terminal as needed
    console.log('Selected Terminal:', terminal);
  }

  const renderCityItem = ({ item }) => (
    <View style={styles.cityContainer}>
      <Text style={styles.cityName}>{item.mdCityNameFrom}</Text>
      <FlatList
        data={item.terminalList}
        keyExtractor={(terminal) => terminal.mdTerminalCodeFrom}
        renderItem={renderTerminalItem}
      />
    </View>
  );

  const handleOriginSelect = (stateName) => {
    // Handle the selection of the origin state as needed
    console.log('Selected Origin:', stateName);
  };

  const filterOrigins = (inputText) => {
    const filteredData = originList.filter((item) =>
      item.mdStateNameFrom.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredOrigins(filteredData);
  };



  const handleOriginSelect1 = (origin) => {
    setSelectedOrigin(origin);
    setInputValue(origin)
    setShowOriginList(false)
    fetchDestinationList()
  };


  const handleOriginSelect11 = (origin) => {
   // setSelectedOrigin(origin);
    
    setSelecteddescode(origin.mdTerminalCodeTo)
    setSelectedes(origin.mdTerminalNameTo)
    setInputValue1(`${origin.mdTerminalNameTo} (${origin.mdTerminalCodeTo})`)
    setShowdestinationList(false)
   // fetchDestinationList()
  };

  const renderCityItem1 = ({ item }) => (
    <View >
    <FlatList
      data={item.terminalList}
      keyExtractor={(terminal, index) => index.toString()}
      renderItem={({ item: terminal, index }) => (
        <TouchableOpacity onPress={() => handleTerminalSelect(terminal)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.cityContainer}>
            <View style={styles.circle} />
            <Text style={{ color: '#4F4F4F', marginLeft: 10 }}>
              {` ${terminal.mdTerminalNameFrom} (${terminal.mdTerminalCodeFrom})`}
            </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
  
  
  
  );

  const handleTerminalSelect = (terminal) => {
    // Your logic to handle the selected terminal
    console.log(`Selected Terminal: ${terminal.mdTerminalNameFrom} (${terminal.mdTerminalCodeFrom})`);

    setSelectedOrigin(terminal.mdTerminalNameFrom);
    setSelectedOrigincode(terminal.mdTerminalCodeFrom);
   originCode = terminal.mdTerminalCodeFrom;
    setInputValue(`${terminal.mdTerminalNameFrom} (${terminal.mdTerminalCodeFrom})`)
    setShowOriginList(false)
   fetchDestinationList()
  };
  // const renderDestinationItem1 = ({ item }) => (
  //   <TouchableOpacity onPress={() => /* handle destination selection */}>
  //     <Text>{item.mdTerminalNameTo}</Text>
  //   </TouchableOpacity>
  // );



  const filterdestination = (inputText) => {
    setShowdestinationList(true)
    setInputValue1(inputText);

    const filteredData = destinationList.filter((item) =>
      item.mdTerminalNameTo.toLowerCase().includes(inputText.toLowerCase())
    );
    const sortedData = filteredData.sort((a, b) =>
    a.mdTerminalNameTo.toLowerCase().indexOf(inputText.toLowerCase()) -
    b.mdTerminalNameTo.toLowerCase().indexOf(inputText.toLowerCase())
  );

  setFilteredOrigins1(sortedData);
};

  const filterOrigins1 = (inputText) => {
    setShowOriginList(true)
    setInputValue(inputText);

    const filteredData = originList.filter((item) =>
      item.mdStateNameFrom.toLowerCase().includes(inputText.toLowerCase())
    );

    // Sort the filtered data by input value
    const sortedData = filteredData.sort((a, b) =>
      a.mdStateNameFrom.toLowerCase().indexOf(inputText.toLowerCase()) -
      b.mdStateNameFrom.toLowerCase().indexOf(inputText.toLowerCase())
    );

    setFilteredOrigins(sortedData);
  };

  const showDatePicker = () => {
  setDatePickerVisibility1(true);
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
   
    setDatePickerVisibility(false);
    setDatePickerVisibility1(false);
  };

  const showDatePickerr = () => {

   
    setDatePickerVisibility(true);
    setDatePickerVisibility2(true);
  };
  
  const hideDatePickerr = () => {
    setDatePickerVisibility(false);
    setDatePickerVisibility2(false);
  };

  
  
  const handleConfirm = (date) => {
    if(isDatePickerVisible1){
      setSelectedDate(date);
      hideDatePicker();
    }

    if(isDatePickerVisible2){
      setSelectedDater(date);
      hideDatePickerr();
    }
    
  };
  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    return `${day}${month}${year}`;
  };
  
  return (
    <ImageBackground
   // source={require("./assets/busbackgroud.jpg")} // Change path to your image
    style={styles.backgroundImage}
  >

    <View style={styles.container}>
    <Text style={styles.titleText1}>Book Your Trip for a Seamless Journey!</Text>
    <View style={styles.container11}>
    
    <View style={styles.titleContainer}>
  <Text style={styles.titleText}>Express Bus</Text>
  <View style={{height:1,backgroundColor:'#ccc',width:'95%',justifyContent:'centers',marginLeft:10}}></View>
</View>
      <View style={styles.inputContainer}>
        {/* <TouchableOpacity onPress={handleSelectedOriginPress}> */}


        <Text style={styles.titleText2}>Origin</Text>

        <View style={styles.inputContaineri}>
  <FontAwesome5 name="building" size={25} color="#55B9B9" />
  <TextInput
    
    style={styles.textInputi}
    placeholder="Search Origin"
    value={inputValue}
    onChangeText={filterOrigins1}
  />
</View>
      
      {showOriginList && (
  loading ? (
    <ActivityIndicator size="small" color="#55B9B9" />
  ) : (
    <FlatList
      data={filteredOrigins}
      keyExtractor={(item) => item.mdStateCodeFrom}
      renderItem={({ item }) => (

        <View style={[styles.stateContainer, { marginBottom: 0 }]}>
        {/* <TouchableOpacity onPress={() => handleOriginSelect1(item.mdStateNameFrom)}> */}

          <View style={styles.container2}>
      {/* <View style={styles.circle} /> */}
      <Text style={{ color:'#4F4F4F',fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>{item.mdStateNameFrom}</Text>
    </View>         
          <FlatList
            data={item.cityList}
            keyExtractor={(city) => city.mdCityCodeFrom}
            renderItem={renderCityItem1}
          />
        </View>
      )}
    />
  )
)}

<View style={{marginBottom:20}}></View>
       
<Text style={styles.titleText2}>Destination</Text>

<View style={styles.inputContaineri}>
<FontAwesome5 name="building" size={25} color="#55B9B9" />
<TextInput

style={styles.textInputi}
placeholder="Search Destination"
value={inputValue1}
onChangeText={filterdestination}
/>
</View>
       

{showdestinationList && (
  loading ? (
    <ActivityIndicator size="small" color="#55B9B9" />
  ) : (
    <FlatList
      data={filteredOrigins1}
      keyExtractor={(item) => item.mdStateCodeFrom}
      renderItem={({ item }) => (
        <View style={styles.stateContainer}>
          <TouchableOpacity onPress={() => handleOriginSelect11(item)}>
            {/* <Text >{item.mdTerminalNameTo}</Text> */}
            <View style={styles.cityContainer}>
            <View style={styles.circle} />
            <Text style={{ color: '#4F4F4F', marginLeft: 10 }}>
              {` ${item.mdTerminalNameTo} (${item.mdTerminalCodeTo})`}
            </Text>
            </View>
          </TouchableOpacity>
         
        </View>
      )}
    />
  )
)}
      </View>
     




      
      <View style={styles.dateInputContainer}>


      <Text style={styles.titleText2}>Departure Date</Text>

<View style={styles.inputContaineri}>
<FontAwesome5 name="calendar" size={25} color="#55B9B9" />
<Text
  placeholder="Date (DD/MM/YYYY)"
  placeholderTextColor="#27267d"
  onPress={showDatePicker}
  style={styles.textInput1}
>
  {formatDate(selectedDate)}
</Text>
</View>


           <View style={{marginBottom:20}}></View>
<Text style={styles.titleText2}>Return Date</Text>

<View style={styles.inputContaineri}>
<FontAwesome5 name="calendar" size={25} color="#55B9B9" />
<Text
  placeholder="Date (DD/MM/YYYY)"
  placeholderTextColor="#27267d"
  onPress={showDatePickerr}
  style={styles.textInput1}
>
{selectedDater ? formatDate(selectedDater) : 'Select Date'}
</Text>
</View>
 <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

<View style={{marginBottom:10}}></View>
{/* <TextInput
  placeholder="Return Date (Optional)"
  placeholderTextColor="#27267d"
  onPress={() => showDatePicker(selectedDater, handleDateSelectr)}
  style={styles.textInput1}
>
  {formatDate(selectedDater)}
</TextInput> */}


      </View>
      <TouchableOpacity style={styles.button} onPress={() => 
        {
          if (ref) {
            // If ref is not empty, navigate to 'bus1' with parameters
            navigation.navigate('bus1', { oname: selectedOrigin, ocode: selectedOrigincode, dname: selecteddes, dcode: selectedescode, date: formatDate(selectedDate), ref: ref ,date1: selectedDater ? formatDate(selectedDater) : ''});
          } else {
            // Handle the case when ref is empty, e.g., show an alert or log a message
            console.log('Ref is empty. Cannot navigate.');
          }
        
       // navigation.navigate("bus1");

       //</View> navigation.navigate('bus1', { oname: selectedOrigin, ocode: selectedOrigincode,dname: selecteddes, dcode: selectedescode,date: selectedDate,ref:ref });
      
    
        console.log('Searching for buses')}}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
    </View>
      {/* <Button title="Search" onPress={() => console.log('Searching for buses')} style={styles.button} /> */}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
   // backgroundColor: '#fff',
  },
  container11: {
    borderRadius:20,
    
    borderWidth:1,
    borderColor:'#55B9B9',
    backgroundColor: '#fff',
   // backgroundColor: '#fff',
  },
  title: {
    marginBottom: 10,
    backgroundColor: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    width: '100%',
    height: 50,
    color: '#fff',
    borderRadius: 20,
   // borderTopLeftRadius: 20,
   // borderTopRightRadius: 20,

  },
  titleContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
    overflow: 'hidden', // This is important to ensure the border radius is applied correctly
  },
  
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:14 ,
    padding: 10,
    height: 50,
    color: '#55B9B9',
  },
  titleText2: {
    fontSize: 16,
   
    padding: 0,
    height: 30,
    color: '#000',
  },
  titleText1: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    height: 50,
    color: '#000',
  },
  inputContainer: {
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    marginBottom:20,
    flexDirection: 'column',
    
  
    color: '#fff' 
  },
  dateInputContainer: {

    marginTop:0,
    marginLeft:20,
    marginRight:20,
    flexDirection: 'column',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#55B9B9',
    padding: 10,
    fontSize: 16,
    // marginBottom: 24,  // Add marginBottom for spacing below the text input
    borderRadius: 0,
  },
  textInput22: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 0,  // Add marginBottom for spacing below the text input
    borderRadius: 0,
  },

  textInput1: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    // Add marginBottom for spacing below the text input
    borderRadius: 0,
  },
  button: {
    
    fontSize: 16,
    backgroundColor: '#55B9B9',
    borderRadius: 0,
    width: '90%',
    marginTop: 16,
    marginLeft: 20,
    height:42 ,
    marginBottom: 20,

    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: 'white', // Set your desired text color
    fontSize: 16,
  },
  originItem: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  email: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorDarkslateblue_300,
   
    height: 20,

  
   
  },
  emailTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  stateContainer:{
    backgroundColor:'#FFFFFF',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
   backgroundColor:'#FFFFFF',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginLeft:10,
    backgroundColor: '#55B9B9', // Set your desired circle color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center', // or 'stretch' for a different effect
    justifyContent: 'center',
    backgroundColor:'CBD1D2',
  },
  cityContainer: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center children vertically
    backgroundColor: '#E8E8E8', // Light gray background color
    borderRadius: 20, // Border radius of 6
    height: 35, // Height of 35
    paddingLeft: 10, // Add padding if needed
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
  },
  inputContaineri: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center items vertically
    borderWidth: 1, // Add border for better visibility
    borderColor: '#55B9B9', // Border color
    borderRadius: 5, // Border radius for a rounded appearance
    padding: 10, // Add padding for better spacing
  },
  textInputi: {
    flex: 1, // Takes the remaining space in the container
    marginLeft: 10, // Add left margin to create space between icon and input
  },


});

export default BusSearchScreen;
