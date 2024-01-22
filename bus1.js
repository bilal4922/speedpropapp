

// import React, { useState, useEffect } from 'react';
// import  Icon  from 'react-native-vector-icons/MaterialIcons';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   Button, 
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//    ActivityIndicator,
//    ImageBackground

// } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { URLSearchParams } from 'url-search-params-polyfill'; // Import the polyfill
// import queryString from 'query-string';

// const MyWebView =  ({ route,navigation }) => {

//   const { oname, ocode, dname, dcode, date, ref,date1} = route.params;
//   const [redirectUrl, setRedirectUrl] = useState('');

//   const [loading, setLoading] = useState(true);

//   const handleLoad = () => {
//     setLoading(false);
//   };

//   useEffect(() => {
//     // Check if 'ref' is not empty and log it
//     if (ref) {
//       console.log('Received ref:', ref);
//     }
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
//         <Icon name="arrow-back" size={25} color="#007AFF" />
//       </TouchableOpacity>
//       ),
//       headerTitle: '',
//     });
//   }, [navigation]);
//   const handleNavigationStateChange = (navState) => {
//     const urlParams = parseUrlParams(navState.url);

//     // You can now access the parameters using object notation
//     const someParam = urlParams.someParam;

//     // Log the parameters (customize based on your parameters)
//     console.log('URL Parameters:', urlParams);
//     console.log('Value of someParam:', someParam);

//     // Do further processing based on the parameters if needed

//     // Update the state to store the current redirect URL
//     setRedirectUrl(navState.url);
//   };
//   const parseUrlParams = (url) => {
//     const params = {};
//     const urlParts = url.split('?');
//     if (urlParts.length > 1) {
//       const queryString = urlParts[1];
//       const pairs = queryString.split('&');
//       pairs.forEach((pair) => {
//         const [key, value] = pair.split('=');
//         params[key] = value;
//       });
//     }
//     return params;
//   };

//   const bookingData = {
//     OriginCode: ocode,
//     OriginalName: oname,
//     DestinationCode: dcode,
//     DestinationName: dname,
//     DateFrom: date,
    
//     AffCode: 'gohub',
//    DateTo: date1, // Add the actual value if needed
//     UserDialCode: '+60',
//     UserEmailAddress: 'bilal.muhammad4922@gmail.com',
//     UserGender: 'false',
//     UserIdentityNumber: '001106-03-0854',
//     UserMobileNumber: '1137373737',
//     UserPassportNo: '', // Add the actual value if needed
//     PartnerBookingReferenceNo: ref,
//     PostbackURL: 'https://halaltravel.ai/ht/api/v1/bus/booking/confirm',
//     RedirectURL: 'https://vm.epictravel.aii/bus-ticket-confirm ⁠',
//    // https://vm.epictravel.ai/bus-ticket-confirm
//     // Populate bookingData with your actual data
//   };

//   const formHtml = `
//   <html>
//     <body>
//       <form id="redirectForm" action="https://gohub-v2-web-demo.azurewebsites.net/ExpressBus/Trip/BusTicketExtend" method="POST">
//         <input type="hidden" name="OriginCode" value="${bookingData.OriginCode}" />
//         <input type="hidden" name="OriginName" value="${bookingData.OriginalName}" />
//         <input type="hidden" name="DestinationCode" value="${bookingData.DestinationCode}" />
//         <input type="hidden" name="DestinationName" value="${bookingData.DestinationName}" />
//         <input type="hidden" name="DateFrom" value="${bookingData.DateFrom}" />
//         <input type="hidden" name="DateTo" value="${bookingData.DateTo}" />
//         <input type="hidden" name="UserEmailAddress" value="${bookingData.UserEmailAddress}" />
//         <input type="hidden" name="UserIdentityNumber" value="${bookingData.UserIdentityNumber}" />
//         <input type="hidden" name="UserPassportNo" value="${bookingData.UserPassportNo}" />
//         <input type="hidden" name="UserGender" value="${bookingData.UserGender}" />
//         <input type="hidden" name="UserDialCode" value="${bookingData.UserDialCode}" />
//         <input type="hidden" name="UserMobileNumber" value="${bookingData.UserMobileNumber}" />
//         <input type="hidden" name="AffCode" value="${bookingData.AffCode}" />
//         <input type="hidden" name="PartnerBookingReferenceNo" value="${bookingData.PartnerBookingReferenceNo}" />
//         <input type="hidden" name="PostbackURL" value="${bookingData.PostbackURL}" />
//         <input type="hidden" name="RedirectURL" value="${bookingData.RedirectURL}" />
//       </form>
//       <script>
//         document.getElementById('redirectForm').submit();
//       </script>
//     </body>
//   </html>
// `;


//   return (
   
//     <WebView
      
//       originWhitelist={['*']}
//       source={{ html: formHtml }}
//       javaScriptEnabled={true}
//       domStorageEnabled={true}
//       onLoad={handleLoad}
//       onError={(syntheticEvent) => console.log('WebView error: ', syntheticEvent.nativeEvent)}
//       onNavigationStateChange={handleNavigationStateChange}
//     />
    
//   );
// };

// export default MyWebView;

import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity,Text } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebView = ({ route, navigation }) => {
  const { oname, ocode, dname, dcode, date, ref, date1 } = route.params;
  const [redirectUrl, setRedirectUrl] = useState('');

   const [bookingNo, setbookingNo] = useState('');
  const [loading, setLoading] = useState(true);
  
const [ShowWebView, setShowWebView] = useState(true);
  const handleLoad = () => {
    setLoading(false);
  };

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

  const handleNavigationStateChange = (navState) => {
    const urlParams = parseUrlParams(navState.url);

    // You can now access the parameters using object notation
  //  const salesTransactionNo = urlParams.SalesTransactionNo;

    // Log the parameters (customize based on your parameters)
  //  console.log('URL Parameters:', urlParams);
  //  console.log('SalesTransactionNo:', salesTransactionNo);


    if ('BookingNo' in urlParams) {
    const bookingNo = urlParams.BookingNo;
    console.log('BookingNo:', bookingNo);
    setbookingNo(bookingNo)

    // Perform further processing based on the presence of "BookingNo"
  }

     if ('SalesTransactionNo' in urlParams) {
    const bookingNo = urlParams.SalesTransactionNo;
    console.log('SalesTransactionNo:', bookingNo);
    setShowWebView(false);
   // setbookingNo(bookingNo)

    // Perform further processing based on the presence of "BookingNo"
  }
    // Do further processing based on the parameters if needed

    // Update the state to store the current redirect URL
    setRedirectUrl(navState.url);

    // Check if "SalesTransactionNo" is present and hide WebView
    // if (salesTransactionNo) {
    //   // Perform navigation or update state to change the view accordingly
    //   // For demonstration purposes, let's assume there is a state variable 'showWebView'
    //   // that controls the visibility of the WebView
    //   setShowWebView(false);
    // }
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
    <View>
      <Text>Congratulations! Your booking is done.</Text>
    </View>
  );
};

export default MyWebView;
