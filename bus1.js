

import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity,Text, FlatList, StyleSheet,Image ,ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebView = ({ route, navigation }) => {
  const { oname, ocode, dname, dcode, date, ref, date1 } = route.params;
  const [redirectUrl, setRedirectUrl] = useState('');

   const [bookingNo, setbookingNo] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  
const [ShowWebView, setShowWebView] = useState(true);
const [ticketData, setTicketData] = useState([]);
  const handleLoad = () => {
    setLoading(false);
  };

  const ticketData1 = [
    {
      label: 'Departure Location',
      value: 'Melaka Sentral',
    },
  ]

  useEffect(() => {
    // Check if 'ref' is not empty and log it
    if (ref) {
      console.log('Received ref:', ref);
    }
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Icon name="arrow-back" size={25} color="#007AFF" />
        </TouchableOpacity>
      ),
      headerTitle: '',
    });
  }, [navigation]);

  let salesTransactionNoCounter = 0;

  const handleNavigationStateChange = (navState) => {
      const urlParams = parseUrlParams(navState.url);
  
      // Check for BookingNo
      if ('BookingNo' in urlParams) {
          const bookingNo = urlParams.BookingNo;
          console.log('BookingNo:', bookingNo);
          setbookingNo(bookingNo);
  
          // Perform further processing based on the presence of "BookingNo"
      }
  
      // Check for SalesTransactionNo
      if ('SalesTransactionNo' in urlParams) {
          const salesTransactionNo = urlParams.SalesTransactionNo;
          console.log('SalesTransactionNo:', salesTransactionNo);
  
          // Increment counter when SalesTransactionNo appears
          salesTransactionNoCounter++;
  
          if (salesTransactionNoCounter === 4) {
              console.log('SalesTransactionNo has appeared four times. Sky!',);
              setShowWebView(false);
              setbookingNo(salesTransactionNo);
              fetchData();
          }
      }
  };
  

  const parseUrlParams = (url) => {
    const params = {};
    const urlParts = url.split('?');
    if (urlParts.length > 1) {
      const queryString = urlParts[1];
      const pairs = queryString.split('&');
      pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        params[key] = value;
      });
    }
    return params;
  };

  const bookingData = {
    OriginCode: ocode,
    OriginalName: oname,
    DestinationCode: dcode,
    DestinationName: dname,
    DateFrom: date,
    AffCode: 'gohub',
    DateTo: date1,
    UserDialCode: '+60',
    UserEmailAddress: 'bilal.muhammad4922@gmail.com',
    UserGender: 'false',
    UserIdentityNumber: '001106-03-0854',
    UserMobileNumber: '1137373737',
    UserPassportNo: '',
    PartnerBookingReferenceNo: ref,
    PostbackURL: 'https://halaltravel.ai/ht/api/v1/bus/booking/confirm',
    RedirectURL: 'https://vm.epictravel.ai/bus-ticket-confirm',
    // Populate bookingData with your actual data
  };


  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbm1oZzE5OTAwQGdtYWlsLmNvbSIsInVzZXJJZCI6NDUsImlhdCI6MTcwNjAyMzA5NiwiZXhwIjoxNzA2NjI3ODk2fQ.scqh3FMQXEl_CFaFVP6QKk_ronrimTFaJsJhb2RUm1yBXNix5p8Y2W0R6u56jMTF7Vph-3gEr7mLmMWnL0totQ';

  const fetchData = async () => {
    try {
      const accessToken = "YOUR_BEARER_TOKEN"; // Replace with your actual token
      const response = await fetch(`https://halaltravel.ai/ht/api/v1/bus/booking/${bookingNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Add other headers if needed
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      setTicketData(data);
      setIsLoading1(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading1(false);
    }
  };
  
  const formHtml = `
    <html>
      <body>
        <form id="redirectForm" action="https://gohub-v2-web-demo.azurewebsites.net/ExpressBus/Trip/BusTicketExtend" method="POST">
          <input type="hidden" name="OriginCode" value="${bookingData.OriginCode}" />
          <input type="hidden" name="OriginName" value="${bookingData.OriginalName}" />
          <input type="hidden" name="DestinationCode" value="${bookingData.DestinationCode}" />
          <input type="hidden" name="DestinationName" value="${bookingData.DestinationName}" />
          <input type="hidden" name="DateFrom" value="${bookingData.DateFrom}" />
          <input type="hidden" name="DateTo" value="${bookingData.DateTo}" />
          <input type="hidden" name="UserEmailAddress" value="${bookingData.UserEmailAddress}" />
          <input type="hidden" name="UserIdentityNumber" value="${bookingData.UserIdentityNumber}" />
          <input type="hidden" name="UserPassportNo" value="${bookingData.UserPassportNo}" />
          <input type="hidden" name="UserGender" value="${bookingData.UserGender}" />
          <input type="hidden" name="UserDialCode" value="${bookingData.UserDialCode}" />
          <input type="hidden" name="UserMobileNumber" value="${bookingData.UserMobileNumber}" />
          <input type="hidden" name="AffCode" value="${bookingData.AffCode}" />
          <input type="hidden" name="PartnerBookingReferenceNo" value="${bookingData.PartnerBookingReferenceNo}" />
          <input type="hidden" name="PostbackURL" value="${bookingData.PostbackURL}" />
          <input type="hidden" name="RedirectURL" value="${bookingData.RedirectURL}" />
        </form>
        <script>
          document.getElementById('redirectForm').submit();
        </script>
      </body>
    </html>
  `;

  return ShowWebView ? (
    <WebView
      originWhitelist={['*']}
      source={{ html: formHtml }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onLoad={handleLoad}
      onError={(syntheticEvent) => console.log('WebView error: ', syntheticEvent.nativeEvent)}
      onNavigationStateChange={handleNavigationStateChange}
    />
  ) : (
    
    // Render your congratulatory message or another view here
    <View style={styles.container}>
       {isLoading1 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {!isLoading1 && (
//      <FlatList
//       data={ticketData1}
//       renderItem={({ item }) => (
//         <View style={{ flex: 1, flexDirection: 'row' ,padding:10,borderColor:'#ccc',borderWidth:1,borderRadius:4,height:220,margin:20}}>
//           <View style={{ flex: 0.7, }}>
//           <View style={{ flexDirection: 'row',  }}>
     
//       <Text style={styles.label}>Melaka Sentral</Text>
//         <Icon name="arrow-right" size={10} color="#000" />
//        <Text style={styles.label}>Melaka Sentral</Text>
//     </View>
//     <Text style={styles.label}>daate</Text>
//     <View style={{ flexDirection: 'row',  }}>
     
//      <Text style={styles.label1}>Operator Ticket Ref No.</Text>
       
//       <Text style={styles.label2}>Melaka Sentral</Text>
//    </View>
//    <View style={{ flexDirection: 'row',  }}>
     
//      <Text style={styles.label1}>Booking No.</Text>
       
//       <Text style={styles.label2}>Melaka Sentral</Text>
//    </View>
//    <View style={{ flexDirection: 'row',marginTop:20  }}>

//    <Icon 
          
         
//           name="directions-bus" color="#55B9B9" size={20} style={styles.icon} />
     
//      <Text style={styles.label1}>Trip Detail</Text>
       
      
//    </View>
//    <View style={{ flexDirection: 'row', marginTop: 20 }}>
 
//   <Image
//     source={{ uri: 'https://goticketing.blob.core.windows.net/operatorcompany/a1b2adba-8043-4650-8e6d-95566c90d68e.png' }}
//     style={{ width: 20, height: 20, marginLeft: 10 }}
//   />
//     <Text style={styles.label1}>Delima Vision</Text>
// </View>
// <View style={{ flexDirection: 'row', marginTop: 20 }}>
 
  
//    <Text style={styles.label2}>SEAT NO.</Text>
//    <Text style={styles.label1}>11</Text>
// </View>
//           </View>
//           <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>

//           <Image
//         source={require('./assets/qr.jpg')}
//         style={{ width: 80, height: 80 }}
//       />
//   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
//     <View style={{ marginLeft: 10 }}>
     
//     </View>
//     <View style={{ marginLeft: 10 }}>
//       <Text style={styles.label1}>Trip No</Text>
//       <Text style={styles.label1}>passengerIdentityName</Text>
//       <Text style={styles.label1}>passengerIdentityNo</Text>
//     </View>
//   </View>
// </View>

//         </View>
//       )}
//       keyExtractor={(item) => item.label}
//     />
<FlatList
data={ticketData.trips}
renderItem={({ item }) => (
  <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, height: 260, margin: 20 }}>
    <View style={{ flex: 0.7 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>{item.terminalNameFrom}</Text>
        <Icon name="arrow-right" size={10} color="#000" />
        <Text style={styles.label}>{item.terminalNameTo}</Text>
      </View>
      <Text style={{fontSize:10,marginTop:10,marginBottom:10}}>Date: {item.departDate}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label1}>Operator Ticket No.</Text>
        <Text style={styles.label2}>{item.tickets[0].operatorTicketNo}</Text>
      </View>
      <View style={{marginTop:10}}></View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label1}>Booking No.</Text>
        <Text style={styles.label2}>{ticketData.bookingNo}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
  <Icon name="directions-bus" color="#55B9B9" size={20} style={styles.icon} />
  <Text style={{  fontWeight: 'bold',
    fontSize: 10,
    color: '#67B7B2',
    padding:0 ,
    marginTop:0}}>Trip Detail</Text>
  <View style={{ flex: 1, height: 1, backgroundColor: '#55B9B9', marginLeft: 10 }} />
</View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Image
          source={{ uri: item.operatorCompanyLogo }}
          style={{ width: 60, height: 20, marginLeft: 0 }}
        />
        <Text style={{  fontWeight: 'bold',
    fontSize: 10,
    color: '#67B7B2',
    padding:0 ,
    marginTop:5,
    marginLeft:10
  }}>{item.operatorCompanyName}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={styles.label2}>SEAT NO.</Text>
        <Text style={{  fontWeight: 'bold',
    fontSize: 10,
    color: '#67B7B2',
    padding:0 ,
    marginTop:7,
    marginLeft:10
  }}>{item.tickets[0].seatName}</Text>
      </View>
    </View>
    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>

          <Image
        source={require('./assets/qr.jpg')}
        style={{ width: 100, height: 100,marginBottom:20 }}
      />
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
   

    
  <View style={{  marginBottom: -20 }}>
  <Text style={styles.label1}>Trip No: {item.tripCode}</Text>
  <Text style={styles.label1}>{item.tickets[0].passengerIdentityName}</Text>
  <Text style={styles.label1}>{item.tickets[0].passengerIdentityNo}</Text>
</View>
  </View>
</View>

       
  </View>
)}
keyExtractor={(item) => item.tripCode}
/>
    )}

    </View>
  );
};

export default MyWebView;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  itemContainer: {
    
    
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  
  label1: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#67B7B2',
    padding:0 ,
    marginTop:5
  },
  label2: {
   
    fontSize: 10,
    color: '#67B7B2',
    borderColor:'#55B9B9',
    borderWidth:1,
    padding:5 ,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  container: {
   flex: 1,
  backgroundColor: '#fff',
 
 },
 ticket: {  width: '80%',
   borderWidth: 1,
   borderColor: '#ccc',
   padding: 20,
   marginBottom: 20,
  },
 title: {
   fontSize: 16,
    fontWeight: 'bold',
   marginTop: 10,
 },
 subtitle: {
   fontSize: 16,   marginTop: 5,
 },
  button: {
  width: '80%',
 },
});