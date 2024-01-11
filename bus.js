import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
   ActivityIndicator
} from 'react-native';
import {
  Padding,
  Color,
  Border,
  FontSize,
  FontFamily,
} from "./GlobalStylessignin";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome library

const BusSearchScreen = ({ navigation }) => {
  const [originList, setOriginList] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
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
  const [inputValue1, setInputValue1] = useState('');
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbm1oZzE5OTAwMDBAZ21haWwuY29tIiwidXNlcklkIjo0OCwiaWF0IjoxNzA0NjQ3NzY2LCJleHAiOjE3MDUyNTI1NjZ9.wDTuw3E-PHKfFEtz4Ns4_PlZzOOoDqFwPWLFTTh2fxCR-AKljXJL8JJXU6LBUqrdnjOu7syuxAcIJO3to9wEiA';

  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
  }, []);
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
          originCode : "PJS",
          originType: 'terminal',
          destination: 'Kerteh',
        }),
      });

      const result = await response.json();
      console.log("aaaaa", result);

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
    setSelectedOrigin(origin);
    setInputValue1(origin)
    setShowdestinationList(false)
   // fetchDestinationList()
  };

  const renderCityItem1 = ({ item }) => (
    <TouchableOpacity onPress={() => handleOriginSelect1(item.mdCityNameFrom)}>
      <Text style={{ marginLeft: 20 }}>{item.mdCityNameFrom}</Text>
    </TouchableOpacity>
  );

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
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Express Bus</Text>
      <View style={styles.inputContainer}>
        {/* <TouchableOpacity onPress={handleSelectedOriginPress}> */}




        <TextInput
       
       style={styles.textInput}
        placeholder="Search Origins"
        value={inputValue}
        onChangeText={filterOrigins1}
      />
      
      {showOriginList && (
  loading ? (
    <ActivityIndicator size="large" color="#ffb116" />
  ) : (
    <FlatList
      data={filteredOrigins}
      keyExtractor={(item) => item.mdStateCodeFrom}
      renderItem={({ item }) => (

        <View style={[styles.stateContainer, { marginBottom: 20 }]}>
        {/* <TouchableOpacity onPress={() => handleOriginSelect1(item.mdStateNameFrom)}> */}

          <View style={styles.container2}>
      <View style={styles.circle} />
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>{item.mdStateNameFrom}</Text>
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

       
        {/* </TouchableOpacity> */}
        <TextInput
          style={styles.textInput}
          
          placeholder="Enter Destination"
          value={inputValue1}
        onChangeText={filterdestination}
        />

{showdestinationList && (
  loading ? (
    <ActivityIndicator size="large" color="#ffb116" />
  ) : (
    <FlatList
      data={filteredOrigins1}
      keyExtractor={(item) => item.mdStateCodeFrom}
      renderItem={({ item }) => (
        <View style={styles.stateContainer}>
          <TouchableOpacity onPress={() => handleOriginSelect11(item.mdTerminalNameTo)}>
            <Text >{item.mdTerminalNameTo}</Text>
          </TouchableOpacity>
         
        </View>
      )}
    />
  )
)}
      </View>
     




      
      <View style={styles.dateInputContainer}>
        {/* <TextInput
          style={styles.textInput}
          placeholder="Departure Date"
          value={departureDate}
          onChangeText={setDepartureDate}
        /> */}

<Text
              placeholder="Date (DD/MM/YYYY)"
              placeholderTextColor="#27267d"
              
              onPress={showDatePicker}
              style={styles.textInput}
            >{selectedDate.toLocaleDateString()}
            
            </Text>
 <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        {/* <TextInput
          style={styles.textInput}
          placeholder="Return Date (Optional)"
          value={returnDate}
          onChangeText={setReturnDate}
        /> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => 
        {
        navigation.navigate("bus1");
        console.log('Searching for buses')}}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
      {/* <Button title="Search" onPress={() => console.log('Searching for buses')} style={styles.button} /> */}
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
    flexDirection: 'column',
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: 'column',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderRadius:10,
  },
  button: {
    padding: 10,
    fontSize: 16,
    backgroundColor: Color.colorOrange,
    borderRadius: Border.br_3xs,
    width: '95%',
    marginTop: 10,
    marginLeft: 10,
    height:40 ,
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
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000', // Set your desired circle color
  },
});

export default BusSearchScreen;
