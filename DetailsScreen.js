import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, Linking ,FlatList,TouchableOpacity,SafeAreaView,StatusBar, Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './redux/actions';
import { GiPathDistance, GiKnifeFork, GiBed } from 'react-icons/gi';
import { BsSun, BsAirplane, BsTrainFreightFront } from 'react-icons/bs';
import { IoPartlySunnyOutline } from 'react-icons/io5';
import { BiBus, BiMoon } from 'react-icons/bi';
import CustomHeader from './CustomHeaderback';

//import { Icon } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { Icon } from '@rneui/themed'

const DIYOverviewPage = ({ navigation ,route}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header for this screen
    });}, [navigation]);
  var urlmmain =''
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loading);
  const data = useSelector((state) => state.data.data);
  const data3 = useSelector((state) => state.data.data3);
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];



  function findThumbnailURLIndex1(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }
    
    return -1; // If title is not found
  }

  const handleNavigate = (urlmain) => {
    // Your navigation logic here
    navigation.navigate('web', { urlmain }); // Pass the urlmain parameter to the 'web' screen
    console.log('Search button pressed');
  };

 
  function findThumbnailURLIndex2(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }
    
    return -1; // If title is not found
  }

  const { address,
    day,
    date } = route.params;
  const receivedData = {
    theme: 2,
    message: address,
    days: day,
    date: date,
  };

  useEffect(() => {
    handleNavigate689();
  }, []);

  const handleNavigate689 = () => {
   
   
    const receivedData1 = {
      theme: 2,
      message: address,
      days: day,
      date: date,
    };

    try {
      // if (loading) {
        dispatch(fetchData(receivedData1));
    //  } else {
     //   dispatch(fetchData(receivedData1));
      //}
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const renderThumbnail = (place) => {
    const thumbnailIndex = findThumbnailURLIndex1(data3, place);

    if (thumbnailIndex >= 0 && data3[thumbnailIndex]?.thumbnailURL) {
      const thumbnailURL = data3[thumbnailIndex].thumbnailURL;
      const thumbnailURL1 = data3[thumbnailIndex].webURL;

      return (

        
        <View style={{ marginLeft: 0, height: 160 }}>
          <View style={{ display: 'flex', marginTop: 10, marginLeft: 0 }}>
            <Image
              style={{
                marginLeft: 10,
                width: 200,
                height: 140,
                marginTop: 5,
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              source={{ uri: thumbnailURL }}
            />
            {/* <Text
              style={{ marginLeft: 10, color: '#202756', fontSize: 18, marginTop: 5 }}
              onPress={() => Linking.openURL(thumbnailURL1)}
            >
              View on Web
            </Text> */}
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
   

<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <CustomHeader navigation={navigation} />

    <View style={styles.container}>
    
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        
       

       
        <FlatList style={{ backgroundColor:'#ffffff' ,flex:1,width:'100%'}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{flex:1}}>
              <View style={{alignItems:'center'}}>
                <Text style={styles.dayText}>Day {item.day}</Text>
                {(() => {
                  const currentDate = new Date(receivedData.date);
                  const updatedDate = new Date(currentDate.getTime());
                  updatedDate.setDate(updatedDate.getDate() + item.day - 1);

                  const dayOfMonth = updatedDate.getDate();
                  const startMonthString = monthNames[updatedDate.getMonth()];
                  const formattedDate = `${dayOfMonth} ${startMonthString}`;

                  return (
                    receivedData.days !== null ? (
                      <Text style={{ color: '#202756',textAlign:'center' }}>
                        &nbsp;&nbsp; {formattedDate}
                      </Text>
                    ) : null
                  );
                })()}
              </View>
             


              <View style={styles.transportContainer}>
                <Icon  name="map" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
             

                <Text style={styles.activityText}>Transportation</Text>
                <View style={styles.iconContainer}>
                
          <Icon  onPress={() => {
    const urlmain = 'https://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fflights';
    handleNavigate(urlmain);
  }} name="airplanemode-active" color="#202756" size={30} style={styles.icon} />
          <Icon name="train"
          
          onPress={() => {
            const urlmain = 'https://online.ktmb.com.my';
            handleNavigate(urlmain);
          }}
          color="#202756" size={30} style={styles.icon} />
          <Icon 
          
          onPress={() => {
            const urlmain = 'https://gohub.com.my';
            handleNavigate(urlmain);
          }}
          name="directions-bus" color="#202756" size={30} style={styles.icon} />
        
          {/* <FontAwesomeIcon icon="fa-regular fa-plane-up" /> */}
                
                </View>
              </View>

              <View style={[styles.transportContainer, { marginTop: 10 }]}>
                <Icon name="wb-sunny" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
                <Text style={styles.activityText}>Morning</Text>
                <View style={styles.iconContainer}>
                
         
                </View>
              </View>

              <View style={styles.activityContainer}>
       
        <View style={styles.activityDetailContainer}>
          <Text style={styles.activityDetailText}>
            {item.morningactivity && item.morningactivity.replace(item.morningplace, '')}{' '}
            <Text
              style={{ color: '#202756', textDecorationLine: 'underline' }}

              onPress={() => {
                const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.morningplace}, ${receivedData.message}`;
                handleNavigate(urlmain);
              }}

              // onPress={() =>
              //   Linking.openURL(
              //     `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.morningplace}, ${receivedData.message}`
              //   )
              // }
            >
              {item.morningplace}
            </Text>
            , {item.mcomment}
          </Text>
          {data3 && data3.length > 0 && renderThumbnail(item.morningplace)}
        </View>
        {/* {data3 && data3.length > 0 && renderThumbnail(item.morningplace)} */}
      </View>
      <View style={styles.transportContainer}>
                <Icon  name="local-restaurant" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
             

                <Text style={styles.activityText}>Lunch</Text>
                <View style={styles.iconContainer}>
                
                <Text style={{ fontWeight: '300', fontSize: 17 ,marginTop:5 }}>
      <TouchableOpacity

onPress={() => {
  const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.lunch}, ${receivedData.message}`;
  handleNavigate(urlmain);
}}
      //   onPress={() =>

      //     Linking.openURL(
      //       `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.lunch}, ${receivedData.message}`
      //     )
      //   }
       >
        <Text style={{ textDecorationLine: 'underline', color: '#202756', fontSize: 17 }}>
          {item.lunch}
        </Text>
      </TouchableOpacity>
      </Text>
        
      
                
                </View>
              </View>



              <View style={[styles.transportContainer, { marginTop: 10 }]}>
                <Icon name="sunny-snowing" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
                <Text style={styles.activityText}>Afternoon</Text>
                <View style={styles.iconContainer}>
                
         
                </View>
              </View>

              <View style={styles.activityContainer}>
       
        <View style={styles.activityDetailContainer}>
          <Text style={styles.activityDetailText}>
            {item.afternoonactivity && item.afternoonactivity.replace(item.afternoonplace, '')}{' '}
            <Text
              style={{ color: '#202756', textDecorationLine: 'underline' }}

              onPress={() => {
                const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.afternoonplace}, ${receivedData.message}`;
                handleNavigate(urlmain);
              }}
              // onPress={() =>
              //   Linking.openURL(
              //     `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.afternoonplace}, ${receivedData.message}`
              //   )
              // }
            >
              {item.afternoonplace}
            </Text>
            , {item.acomment}
          </Text>
          {data3 && data3.length > 0 && renderThumbnail(item.afternoonplace)}
        </View>
        </View>


        <View style={styles.transportContainer}>
                <Icon  name="local-restaurant" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
             

                <Text style={styles.activityText}>Dinner</Text>
                <View style={styles.iconContainer}>
                
                <Text style={{ fontWeight: '300', fontSize: 17, marginTop:5 }}>
      <TouchableOpacity


onPress={() => {
  const urlmain = `http://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fhotels`;
  handleNavigate(urlmain);
}}
        // onPress={() =>
        //   Linking.openURL(
        //     `http://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fhotels`
        //   )
        // }
      >
        <Text style={{ textDecorationLine: 'underline', color: '#202756', fontSize: 17 }}>
          {item.dinner}
        </Text>
      </TouchableOpacity>
      </Text>
        
      
                
                </View>
              </View>



              <View style={[styles.transportContainer, { marginTop: 10 }]}>
                <Icon name="nightlight-round" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
                <Text style={styles.activityText}>Evening</Text>
                <View style={styles.iconContainer}>
                
         
                </View>
              </View>

              <View style={styles.activityContainer}>
       
        <View style={styles.activityDetailContainer}>
          <Text style={styles.activityDetailText}>
            {item.eveningactivity && item.eveningactivity.replace(item.eveningplace, '')}{' '}
            <Text
              style={{ color: '#202756', textDecorationLine: 'underline' }}

              onPress={() => {
                const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.afternoonplace}, ${receivedData.message}`;
                handleNavigate(urlmain);
              }}
              // onPress={() =>
              //   Linking.openURL(
              //     `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.afternoonplace}, ${receivedData.message}`
              //   )
              // }
            >
              {item.eveningplace}
            </Text>
            , {item.ecomment}
          </Text>
          {data3 && data3.length > 0 && renderThumbnail(item.eveningplace)}
        </View>
        </View>

        <View style={[styles.transportContainer, { marginBottom: 20 }]}>
                <Icon  name="bed" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
             

                <Text style= {[styles.activityText]}>Bedtime Hotels Deals in</Text>
                <View style={styles.iconContainer}>
                
                <Text style={{ fontWeight: '300', fontSize: 14 ,marginTop:5 }}>
      <TouchableOpacity
           onPress={() => {
            const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.lunch}, ${receivedData.message}`;
            handleNavigate(urlmain);
          }}
        // onPress={() =>
        //   Linking.openURL(
        //     `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.lunch}, ${receivedData.message}`
        //   )
        // }
      >
        <Text style={{ textDecorationLine: 'underline', color: '#202756', fontSize: 17 }}>
        {receivedData.message}
        </Text>
      </TouchableOpacity>
      </Text>
        
      
                
                </View>
              </View>

              {/* Continue rendering other parts of your component */}
              {/* ... */}
            </View>
          )}
        />
      )}


    </View>

    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202756',
    textAlign: 'center'

  
  },
  transportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    color: '#202756',
    marginRight: 10,
  },
 
 
  
 
  activityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    
   
  },
  activityIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202756',
  },
  activityDetailContainer: {
    flex: 1,
  
    // This will make the container take up the available space
  },
  activityDetailText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '450',
    marginLeft:10,
  
  },
};

export default DIYOverviewPage;
