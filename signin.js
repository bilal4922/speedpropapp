import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import {
  Padding,
  Color,
  Border,
  FontSize,
  FontFamily,
} from "./GlobalStylessignin";
import Icon from 'react-native-vector-icons/FontAwesome';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import { StatusBar } from 'react-native'; // Import StatusBar
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInPageV2 = ({ navigation }) => {


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header for this screen
    });
  }, [navigation]);

  // Hide the status bar as well
  StatusBar.setHidden(true);
//   test@gohub.coms
// pwd: Test@123
  const [email, setEmail] = React.useState("test@gohub.com");
  const [password, setPassword] = React.useState("Test@123");
  const [isLoading, setIsLoading] = React.useState(false);



  const handleFacebookLogin = () => {
    // Add your Facebook login logic here
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Add your Google login logic here
  };

  const handleSignIn = async() => {


    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    setIsLoading(true);



      axios.interceptors.request.use(
  (config) => {
    // Log the request before sending
    console.log('Request:', config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
    
    // Make an API request
    axios.post(
      "https://halaltravel.ai/ht/api/auth/signin",
      {
        username: email,
        password: password,
      },
      {
        
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json; charset=utf-8'
        },
      }
    )

      .then((response) => {
        setIsLoading(false);
        
        // Check the response for success (adjust as per your API response structure)
        if (response.data.userId !== undefined) {
          // userId exists in the response data
          console.log("User ID:", response.data.userId);
          try {
            const myString = response.data.userId.toString();
          //  token
             AsyncStorage.setItem('userId', myString);
             AsyncStorage.setItem('token', response.data.token);
             navigation.navigate("Home");
          } catch (error) {
            console.error('Error saving user ID to AsyncStorage:', error);
          }
    
          // Navigate to the detail screen upon success
        
        } else {
          // Display an error message
          Alert.alert("Error", "Invalid email or password.");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Error", "Invalid email or password.");
        // Handle API request error
        console.error("API Error:", error);
      //  Alert.alert("Error", "An error occurred while signing in.",error);
      });
  };


  // GoogleSignin.configure({
  //   // Your OAuth 2.0 client ID
  //   iosClientId: '467967159674-38rnssv0nmqtsf7g8h5g9ok1thdn9pr9.apps.googleusercontent.com',
  // });



  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('User Info:', userInfo);
  
  //     // Extract email, name, token, and ID from userInfo
  //     const { email, name, idToken, serverAuthCode } = userInfo.user;
  //     console.log('Email:', email);
  //     console.log('Name:', name);
  //     console.log('ID Token:', idToken);
  //     console.log('Server Auth Code:', serverAuthCode);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // User cancelled the sign-in process
  //       console.log('Sign-In Cancelled');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // Sign-in is in progress already
  //       console.log('Sign-In in Progress');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // Play Services are not available
  //       console.log('Play Services Not Available');
  //     } else {
  //       // Some other error occurred
  //       console.error('Error:', error.message);
  //     }
  //   }
  // }
  

  // Use navigation.setOptions to hide the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header for this screen
    });
  }, [navigation]);

  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.signInPageV2, styles.frameFlexBox2]}>
        <View style={styles.frame}>
          <Image
            style={styles.visitmalaysia262Icon}
            resizeMode="cover"
            source={require("./assets/visitmalaysia26-2.png")}
          />
          <View style={styles.frame1}>
            <Text style={styles.welcomeBack}>Welcome back</Text>
          </View>
          <View
            style={[
              styles.emailWrapper,
              styles.emailWrapperShadowBox,
              {
                width: "90%",
                marginTop: 10,
                marginLeft: 20,
              },
            ]}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor={"#202756"}
               style={[styles.email, styles.emailTypo]}
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <View
            style={[
              styles.emailWrapper,
              styles.emailWrapperShadowBox,
              {
                width: "90%",
                marginTop: 10,
                marginLeft: 20,
              },
            ]}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={Color.colorDarkslateblue_300}
              style={[styles.email, styles.emailTypo]}
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={handleSignIn}
            style={[
              styles.emailWrapper,
              styles.emailWrapperShadowBox,
              {
                backgroundColor: Color.colorOrange,
                borderRadius: Border.br_3xs,
                width: "90%",
                marginTop: 10,
                marginLeft: 20,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text
                style={[
                  styles.email,
                  styles.emailTypo,
                  {
                    color: "#FFFFFF",
                    textAlign: "center",
                  },
                ]}
              >
                Sign In
              </Text>
            )}
          </TouchableOpacity>
          <View style={[styles.frame7, styles.frameFlexBox, { marginLeft: 20, marginRight: 20 }]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("forgot");
                // Handle the press event here
                // You can add your navigation logic or any other actions you want.
              }}
            >
              <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signup");
                // Handle the press event here
                // You can add your navigation logic or any other actions you want.
              }}
            >
              <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
                Sign up now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.signInPageV2, styles.frameFlexBox2]}>
        
       <View>
     
        
      
       </View>
        
      </View>

        <View
          style={[
            styles.container,
            { flex: 1, justifyContent: "flex-end", alignSelf: "stretch" },
          ]}
        >
          <Text
            style={[
              styles.byLoggingInContainer,
              styles.getHelpTypo,
              { margin: 20 },
            ]}
          >
            <Text
              style={styles.byLoggingIn}
            >{`By logging in, it’s redeemed that you have read and agreed to Epic Travel `}</Text>
            <Text style={styles.termsOfUse}>Terms of Use</Text>
            <Text style={styles.byLoggingIn}>{` and `}</Text>
            <Text style={styles.termsOfUse}>Privacy Policy</Text>
            <Text style={styles.byLoggingIn}>.</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};






const styles = StyleSheet.create({
  frameFlexBox2: {
    justifyContent: "flex-end",
   
  },
  frameFlexBox1: {
    alignItems: "center",
    overflow: "hidden",
  },
  emailWrapperShadowBox: {
    paddingHorizontal: Padding.p_2xs,
    borderWidth: 0.5,
    borderColor: Color.colorLightsteelblue,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.05)",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
    width:'90%' ,
    marginTop:10,
    marginLeft:20
  },
  emailTypo: {
  //  fontSize: FontSize.size_sm,
   // textAlign: "left",
  },
  frameFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  frame4SpaceBlock: {
    marginTop: 30,
    alignSelf: "stretch",
  },
  getHelpTypo: {
    letterSpacing: 0.2,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
  },
  frame11Layout: {
    height: 24,
    overflow: "hidden",
  },
  visitmalaysia262Icon: {
    width: 147,
    height: 72,
    marginTop:20,
    marginRight:20,
  },
  welcomeBack: {
    fontSize: FontSize.size_lg,
    letterSpacing: 0.3,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
  },
  frame1: {
    marginTop: 43,
    justifyContent: "center",
    alignSelf: "stretch",
    overflow: "hidden",
    marginLeft:20
  },
  frame: {
    alignItems: "flex-end",
    alignSelf: "stretch",
    overflow: "hidden",
    flexDirection:'column'
    
  },
  email: {
    fontFamily: FontFamily.montserratRegular,
    color: '#202756',
   
    height: Platform.OS === 'ios' ? { height: 20 } : {height: 0}

  
   
  },
  emailWrapper: {
    height: 41,
    paddingVertical: 0,
    justifyContent: "center",
  },

  emailWrapperg: {
    height: 41,
    paddingVertical: 0,
    justifyContent: "center",
  },
  mdieyeOffIcon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  passwordParent: {
    paddingVertical: 10,
    marginTop: 16,
    paddingHorizontal: Padding.p_2xs,
    borderWidth: 0.5,
    borderColor: Color.colorLightsteelblue,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.05)",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
  },
  frame3: {
    alignSelf: "stretch",
  },
  signIn: {
    color: Color.colorMidnightblue_100,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    alignSelf: "stretch",
  },
  signInWrapper: {
    backgroundColor: Color.colorOrange,
    paddingHorizontal: 193,
    paddingVertical: 8,
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
  },
  forgotPassword: {
    color: Color.colorMidnightblue_100,
  },
  frame7: {
    marginTop: 17,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  materialSymbolslanguageIcon: {
    width: 24,
  },
  frame9: {
    width: 151,
    overflow: "hidden",
  },
  frame8: {
    marginTop: 314,
    justifyContent: "center",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frame5: {
    alignSelf: "stretch",
  },
  getHelp: {
    marginLeft: 10,
    color: Color.colorMidnightblue_100,
  },
  frame11: {
    width: 88,
    flexDirection: "row",
    height: 24,
    alignItems: "center",
  },
  frame10: {
    marginTop: 26,
    justifyContent: "center",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frame4: {
    alignItems: "center",
    overflow: "hidden",
  },
  byLoggingIn: {
    color: Color.colorBlack,
  },
  termsOfUse: {
    color: Color.colorMidnightblue_100,
  },
  byLoggingInContainer: {
    marginTop: 30,
    alignSelf: "stretch",
  },
  frame2: {
    marginTop: 33,
    alignSelf: "stretch",
  },
  signInPageV2: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    paddingHorizontal: 19,
    paddingTop: 60,
    paddingBottom: 61,
  },
});

export default SignInPageV2;
