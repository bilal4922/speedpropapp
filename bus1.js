

import React, { useState, useEffect } from 'react';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
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
import { WebView } from 'react-native-webview';


const MyWebView =  ({ route,navigation }) => {

  const { oname, ocode, dname, dcode, date, ref,date1} = route.params;

  const [loading, setLoading] = useState(true);

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

  const bookingData = {
    OriginCode: ocode,
    OriginalName: oname,
    DestinationCode: dcode,
    DestinationName: dname,
    DateFrom: date,
    
    AffCode: 'gohub',
   DateTo: date1, // Add the actual value if needed
    UserDialCode: '+60',
    UserEmailAddress: 'bilal.muhammad4922@gmail.com',
    UserGender: 'false',
    UserIdentityNumber: '001106-03-0854',
    UserMobileNumber: '1137373737',
    UserPassportNo: '', // Add the actual value if needed
    PartnerBookingReferenceNo: ref,
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
     <View style={styles.container}>
      {loading && (
        <ActivityIndicator
        style={styles.activityIndicator}
          size="large"
          color="#007AFF"
        />
      )}
    <WebView
      // originWhitelist={['*']}
      // source={{ html: formHtml }}
      // javaScriptEnabled={true}
      // domStorageEnabled={true}
      // onLoad={handleLoad}
      originWhitelist={['*']}
      source={{ html: formHtml }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onLoad={handleLoad}
      onError={(syntheticEvent) => console.log('WebView error: ', syntheticEvent.nativeEvent)}
    />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a semi-transparent background
  },
});

export default MyWebView;
