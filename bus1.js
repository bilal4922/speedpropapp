
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const YourComponent = () => {
//   const webUrl = 'https://gohub-v2-web-demo.azurewebsites.net/ExpressBus/Trip/BusTicketExtend';

//   // Your data to be passed to the WebView
//   const bookingData = {
//     OriginCode: 'LAR',
//     OriginalName: 'Larkin Sentral',
//     DestinationCode: 'KBG',
//     DestinationName: 'Kuala Berang Bus Station',
//     DateFrom: '14Dec2024',
//     // Add other properties as needed
//     AffCode: 'gohub',
//     DateTo: '', // Add the actual value if needed
//     UserDialCode: '+60',
//     UserEmailAddress: 'izzhhanis@gmail.com',
//     UserGender: 'false',
//     UserIdentityNumber: '001106-03-0852',
//     UserMobileNumber: '1112175833',
//     UserPassportNo: '', // Add the actual value if needed
//     PartnerBookingReferenceNo: '',
//     PostbackURL: 'https://halaltravel.ai/ht/api/v1/bus/booking/confirm',
//     RedirectURL: 'http://localhost:3000/bus-ticket-confirm',
//   };

//   const injectedJavaScript = `
//     window.bookingData = ${JSON.stringify(bookingData)};
//   `;

//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{ uri: webUrl }}
//         style={styles.webview}
//         injectedJavaScript={injectedJavaScript}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default YourComponent;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const YourComponent = () => {
//   const [apiResponse, setApiResponse] = useState(null);

//   const bookingData = {
//     OriginCode: 'LAR',
//     OriginalName: 'Larkin Sentral',
//     DestinationCode: 'KBG',
//     DestinationName: 'Kuala Berang Bus Station',
//     DateFrom: '14Dec2023',
//     // Add other properties as needed
//     AffCode: 'gohub',
//     DateTo: '', // Add the actual value if needed
//     UserDialCode: '+60',
//     UserEmailAddress: 'izzhhanis@gmail.com',
//     UserGender: 'false',
//     UserIdentityNumber: '001106-03-0852',
//     UserMobileNumber: '1112175833',
//     UserPassportNo: '', // Add the actual value if needed
//     PartnerBookingReferenceNo: '',
//     PostbackURL: 'https://halaltravel.ai/ht/api/v1/bus/booking/confirm',
//     RedirectURL: 'http://localhost:3000/bus-ticket-confirm',
//   };

//   const handleButtonSearch = () => {
//     axios.post('https://gohub-v2-web-demo.azurewebsites.net/ExpressBus/Trip/BusTicketExtend', bookingData)
//       .then((response) => {
//         // Handle the API response data here
//         console.log("aaaa",response.data)
//         setApiResponse(response.data);
//       })
//       .catch((error) => {
//         // Handle errors here
//         console.error('Error:', error);
//       });
//   };

//   useEffect(() => {
//     // Call the API when the component mounts or based on your requirements
//     handleButtonSearch();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {apiResponse && (
//         <WebView
//           source={{ html: `<html><body><pre>${JSON.stringify(apiResponse, null, 2)}</pre></body></html>` }}
//           style={styles.webview}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default YourComponent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const YourComponent = () => {
//   const [apiResponse, setApiResponse] = useState(null);

//   const bookingData = {
//     OriginCode: 'LAR',
//     OriginalName: 'Larkin Sentral',
//     DestinationCode: 'MEl',
//     DestinationName: 'Melaka Sentral',
//     DateFrom: '14Jan2024',
//     // Add other properties as needed
//     AffCode: 'gohub',
//     DateTo: '', // Add the actual value if needed
//     UserDialCode: '+60',
//     UserEmailAddress: 'bilal.muhammad4922@gmail.com',
//     UserGender: 'false',
//     UserIdentityNumber: '001106-03-0854',
//     UserMobileNumber: '1137373737',
//     UserPassportNo: '', // Add the actual value if needed
//     PartnerBookingReferenceNo: '093ceaf8-35a0-47a4-81f8-a694ed3e843b',
//     PostbackURL: 'https://halaltravel.ai/ht/api/v1/bus/booking/confirm',
//     RedirectURL: 'https://halaltravel.ai',
//   };

//   const handleButtonSearch = () => {
//     axios.post('https://gohub-v2-web-demo.azurewebsites.net/ExpressBus/Trip/BusTicketExtend', bookingData)
//       .then((response) => {
//         // Handle the API response data here
        
//         setApiResponse(response.data);
//       })
//       .catch((error) => {
//         // Handle errors here
//         console.error('Error:', error);
//       });
//   };

//   useEffect(() => {
//     // Call the API when the component mounts or based on your requirements
//     handleButtonSearch();
//   }, []);

 

//   return (
//     <View style={styles.container}>
//       {apiResponse && (
//         <WebView
//           source={{ html: apiResponse }}
//           style={styles.webview}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default YourComponent;

// import React, { useState } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { WebView } from 'react-native-webview';

// const YourComponent = () => {
//   const [apiResponse, setApiResponse] = useState(null);

//   const bookingData = {
//     OriginCode: 'LAR',
//     OriginalName: 'Larkin Sentral',
//     DestinationCode: 'MEl',
//     DestinationName: 'Melaka Sentral',
//     DateFrom: '12Jan2024',
//     // Add other properties as needed
//     AffCode: 'gohub',
//     DateTo: '13Jan2024', // Add the actual value if needed
//     UserDialCode: '+60',
//     UserEmailAddress: 'bilal.muhammad4922@gmail.com',
//     UserGender: 'false',
//     UserIdentityNumber: '001106-03-0854',
//     UserMobileNumber: '1137373737',
//     UserPassportNo: 'BW3709345', // Add the actual value if needed
//     PartnerBookingReferenceNo: 'e966684b-ee9b-40d6-9212-2efa0e05a30a',
//     PostbackURL: 'https://halaltravel.ai/ht/api/v1/bus/booking/confirm',
//     RedirectURL: 'https://halaltravel.ai',
//   };

//   const handleButtonSearch = () => {
//     fetch('https://gohub-v2-web-demo.azurewebsites.net/ExpressBus/Trip/BusTicketExtend', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(bookingData),
//     })
//       .then((response) => response.text())  // Use response.text() to get the raw response
//       .then((data) => {
//         console.log('Raw Response:', data);
//         setApiResponse(data);  // Try parsing the response as JSON
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };
  
//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <Button title="Search" onPress={handleButtonSearch} />
//       </View>
//       <View style={styles.webviewContainer}>
//         {apiResponse && (
//           <WebView
//             source={{ html: apiResponse }}
//             style={styles.webview}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   buttonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   webviewContainer: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
// });


// export default YourComponent;


import React from 'react';
import { WebView } from 'react-native-webview';

const MyWebView = () => {
  const bookingData = {
    OriginCode: 'LAR',
    OriginalName: 'Larkin Sentral',
    DestinationCode: 'MEL',
    DestinationName: 'Melaka Sentral',
    DateFrom: '14Jan2024',
    
    AffCode: 'gohub',
   DateTo: '', // Add the actual value if needed
    UserDialCode: '+60',
    UserEmailAddress: 'bilal.muhammad4922@gmail.com',
    UserGender: 'false',
    UserIdentityNumber: '001106-03-0854',
    UserMobileNumber: '1137373737',
    UserPassportNo: '', // Add the actual value if needed
    PartnerBookingReferenceNo: 'bbde02c9-9fd1-45fa-88de-4d44f287ab19',
    PostbackURL: 'https://halaltravel.ai/ht/api/v1/bus/booking/confirm',
    RedirectURL: 'https://halaltravel.ai',
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


  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: formHtml }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

export default MyWebView;
