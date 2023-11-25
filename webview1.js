


import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator ,SafeAreaView,StatusBar,Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomHeader from './CustomHeaderback2';
const WebViewScreen = ({ navigation,route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header for this screen
    });}, [navigation]);
  
   const { urlmain } = route.params;
  // const encodedUrlmain = encodeURIComponent(urlmain);
 //  Alert.alert(urlmain)
   //const encodedUrlmain = encodeURIComponent(urlmain)
 // const { webUrl } = route.params; // Get the webUrl from the route parameters
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle WebView load events
  const handleWebViewLoad = () => {
    setIsLoading(false); // Set isLoading to false when the page is loaded
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <CustomHeader navigation={navigation} />
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#202756" // Change to the color you prefer
          style={styles.activityIndicator}
        />
      )}
      <WebView
        source={{ uri:urlmain }}
        style={styles.webView}
        androidHardwareAccelerationDisabled={true}
        javaScriptEnabled={true} // Enable JavaScript if needed
        onLoad={handleWebViewLoad}
        onError={(error) => {
          console.error("WebView Error: ", error);
          Alert.alert(
            "WebView Error",
          error,
            [{ text: "OK" }],
            { cancelable: false }
          );
        }}
      
      
      
      
      
      
        
       

        // Attach the onLoad event handler
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    opacity: 0.99,overflow: 'hidden' ,
    flex: 1,
  },
});

export default WebViewScreen;
