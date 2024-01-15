import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, Linking ,FlatList,TouchableOpacity,SafeAreaView,StatusBar, Alert,Modal ,TextInput} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './redux/actions';
import { GiPathDistance, GiKnifeFork, GiBed } from 'react-icons/gi';
import { BsSun, BsAirplane, BsTrainFreightFront } from 'react-icons/bs';
import { IoPartlySunnyOutline } from 'react-icons/io5';
import { BiBus, BiMoon } from 'react-icons/bi';
import CustomHeader from './CustomHeaderback';
import {
  Padding,
  Color,
  Border,
  FontSize,
  FontFamily,
} from "./GlobalStylessignin";

//import { Icon } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
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


  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}-12h`;
    return formattedDate;
  }

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
    console.log('Search button pressed',urlmain);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
   // Alert.alert(`Modal)...`);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
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
    date,id } = route.params;


    const dateString = date // Replace this with your date string
const dateObject = new Date(dateString);

console.log(dateObject); // This will log the Date object to the console

  const receivedData = {
    theme: 2,
    message: address,
    days: day,
    date: dateObject,
    id:id
  };

  

  // const handleNavigate689 = () => {
   
   
  //   // const receivedData1 = {
  //   //   theme: 2,
  //   //   message: address,
  //   //   days: day,
  //   //   date: date,
  //   //   id:id
  //   // };

  //   try {
  //     console.log('Annnn ', date);
  //       // dispatch(fetchData(receivedData));
  //   //  } else {
  //    //   dispatch(fetchData(receivedData1));
  //     //}
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };

  const [email, setEmail] = React.useState("");
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
      <View
  style={{
    
    height:10 ,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10, // Adjust the right padding as needed
    paddingTop: 10, // Adjust the top padding as needed
  }}
>
  <TouchableOpacity
    style={{
      // borderColor: '#192579',
      // borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    }}
    onPress={() => openModal()} // You can use openModal directly here
  >
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
      {/* Save Plan */}
    </Text>
  </TouchableOpacity>
</View>


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
                   
                      <Text style={{ color: '#202756',textAlign:'center' }}>
                        &nbsp;&nbsp;{formattedDate} 
                      </Text>
                    
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

<Icon2  onPress={() => {



const nextDay = new Date(receivedData.date);
          nextDay.setDate(receivedData.date.getDate() + 1);
          
          const nextThreeDays = new Date(nextDay);
          nextThreeDays.setDate(nextDay.getDate() + 3);
          
          const formattedCurrentDate = formatDate(receivedData.date);
          const formattedNextDay = formatDate(nextDay);
          const formattedNextThreeDays = formatDate(nextThreeDays);
          
          const encodedCityName = encodeURIComponent(receivedData.message || "Kuala-Lumpur-Intl,Kuala-Lumpur,Malaysia,-KUL-c4723-lKUL");
          
          const urlmain = `https://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fcars/${encodedCityName}/${formattedNextDay}/${formattedNextThreeDays}`;
          handleNavigate(urlmain);



// const urlmain = `https://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fcars/${receivedData.message}/${formattedDate2}?sort=rank_a`;
//  // https://www.kayak.com.my/cars/Kuala-Lumpur%2CMalaysia-c4723/2023-10-13/2023-10-17?sort=rank_a
//    // const urlmain = 'https://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fcars';
//     handleNavigate(urlmain);
  }} name="car" color="#202756" size={25} style={styles.icon} />
          <Icon name="directions-train"
          
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
      {/* <View style={styles.transportContainer}>
                <Icon  name="local-restaurant" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
              */}

                {/* <Text style={styles.activityText}>lunch ideas</Text> */}
                {/* <View style={styles.iconContainer}>
                
                <Text style={{ fontWeight: '300', fontSize: 17 ,marginTop:5 }}>
      <TouchableOpacity

onPress={() => {
  const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${receivedData.message}' food local restaurants'`;
  handleNavigate(urlmain);
}}
      //   onPress={() =>

      //     Linking.openURL(
      //       `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.lunch}, ${receivedData.message}`
      //     )
      //   }
       >
        <Text style={[styles.activityText, { textDecorationLine: 'underline' }]}>Lunch ideas</Text>

        {/* <Text style={{ textDecorationLine: 'underline', color: '#202756', fontSize: 17 }}>
          {item.lunch}
        </Text>
        <Text style={styles.activityText}>lunch ideas</Text> */}
      {/* </TouchableOpacity>
      </Text>
         */}
      
                
                {/* </View> */}
              {/* </View> */}



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


        {/* <View style={styles.transportContainer}>
                <Icon  name="local-restaurant" color="#202756" size={30} style={{marginLeft:10,marginRight:10}} />
              */}

                {/* <Text style={styles.activityText}>Dinner</Text> */}
                {/* <View style={styles.iconContainer}>
                
                <Text style={{ fontWeight: '300', fontSize: 17, marginTop:5 }}>
      <TouchableOpacity */}


{/* onPress={() => {
  
  const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${receivedData.message}' food local restaurants'`;

             handleNavigate(urlmain);
}}
        // onPress={() => */}
        {/* //   Linking.openURL(
        //     `http://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fhotels`
        //   )
        // } */}
   
        {/* <Text style={{ textDecorationLine: 'underline', color: '#202756', fontSize: 17 }}>
          {item.dinner}
        </Text> */}
      {/* </TouchableOpacity>
      </Text>
        
      
                
                </View>
              </View>
 */}


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
                const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.eveningplace}, ${receivedData.message}`;
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

            title="Go to Details"
            navigation.navigate('hotel1', {
             address: address,
            //  day: selectedThemedays1,
           //  date: selectedDate,
             date: date,
       id:'ffff'
       
       
          });
            // const currentDate = new Date(receivedData.date);
            // const updatedDate = new Date(currentDate.getTime());
            // const updatedDate1 = new Date(currentDate.getTime());
            // updatedDate.setDate(updatedDate.getDate() + item.day - 1);
            
            // Format the date as "YYYY-MM-DD"
            // const year = updatedDate1.getFullYear();
            // const month = String(updatedDate1.getMonth() + 1).padStart(2, '0');
            // const day = String(updatedDate1.getDate()).padStart(2, '0');
         
            // const year1 = updatedDate.getFullYear();
            // const month1 = String(updatedDate.getMonth() + 1).padStart(2, '0');
            // const day1 = String(updatedDate.getDate()).padStart(2, '0');
         
            // const formattedDate1 = `${year}-${month}-${day}`;
            // const formattedDate2 = `${year1}-${month1}-${day1}`;
            // const encodedCityName = encodeURIComponent(receivedData.message);

            // const urlmain = `http://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fhotels/${encodedCityName}/${formattedDate1}/${formattedDate2}?sort=distance_a`;
            // handleNavigate(urlmain);
            // const urlmain = `https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.lunch}, ${receivedData.message}`;
            // handleNavigate(urlmain);
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

<Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#ffb116', borderWidth: 1 }}>
    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' ,borderColor: '#ffb116', borderWidth: 1}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign:'center' }}>
        Save Plan
      </Text>
      <TextInput
              placeholder="Plan Name"
              placeholderTextColor={"#202756"}
               style={[styles.email, styles.emailTypo , {  height: 20 }] }
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
     
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            backgroundColor: Color.colorOrange,
                borderRadius: Border.br_3xs,
            padding: 10,
           
            width: '45%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
           onPress={() => {
            closeModal()
            Alert.alert('you have successfully saved')
            
          }}

          style={{
            backgroundColor: Color.colorOrange,
                borderRadius: Border.br_3xs,
            padding: 10,
            
            width: '45%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>



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
  email: {
    fontFamily: FontFamily.montserratRegular,
    color: '#202756',
   marginBottom: 10,
    height: Platform.OS === 'ios' ? { height: 20 } : {height: 0}

  
   
  },
};

export default DIYOverviewPage;
