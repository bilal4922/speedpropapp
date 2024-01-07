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

const BusSearchScreen = () => {
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
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <FlatList
      data={filteredOrigins}
      keyExtractor={(item) => item.mdStateCodeFrom}
      renderItem={({ item }) => (
        <View style={styles.stateContainer}>
          <TouchableOpacity onPress={() => handleOriginSelect1(item.mdStateNameFrom)}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.mdStateNameFrom}</Text>
          </TouchableOpacity>
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
    <ActivityIndicator size="large" color="#0000ff" />
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
        <TextInput
          style={styles.textInput}
          placeholder="Departure Date"
          value={departureDate}
          onChangeText={setDepartureDate}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Return Date (Optional)"
          value={returnDate}
          onChangeText={setReturnDate}
        />
      </View>
      <Button title="Search" onPress={() => console.log('Searching for buses...')} style={styles.button} />
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
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 10,
    fontSize: 16,
  },
  originItem: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default BusSearchScreen;
