
import React, { useState ,useRef,useEffect} from 'react';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PhoneInput from 'react-native-phone-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
const SignInPageV2 = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  
  
  const [FullName, setFulllName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const phoneRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [token, setToken] = useState('');


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
const isEmailValid = (email) => {
  // Regular expression for validating an email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const handleSignIn = () => {
  if (!email) {
    Alert.alert("Error", "Please enter your email.");
    return;
  }

  if (!isEmailValid(email)) {
    Alert.alert("Error", "Please enter a valid email address.");
    return;
  }

  if (!password) {
    Alert.alert("Error", "Please enter your password.");
    return;
  }

  if (!FullName) {
    Alert.alert("Error", "Please enter your full name.");
    return;
  }

  if (!selectedDate || isNaN(selectedDate.getTime())) {
    Alert.alert("Error", "Please select a valid date of birth.");
    return;
  }

  if (!phoneNumber) {
    Alert.alert("Error", "Please enter your phone number.");
    return;
  }

  if (!country) {
    Alert.alert("Error", "Please select your country.");
    return;
  }

  setIsLoading(true);
  console.log('Loading', '+' + country, phoneNumber.replace(new RegExp('\\+' + country, 'g'), ''));

  axios
    .post(
      "https://halaltravel.ai/ht/api/auth/signup",
      {
        firstName: FullName,
        lastName: FullName,
        email: email,
        password: password,
        phoneNumber: {
          countryCode: '+' + country,
          phoneNumber: phoneNumber.replace(new RegExp('\\+' + country, 'g'), ''),
        },
        dtOfBirth: selectedDate.toISOString().split('T')[0], // Format selectedDate as "YYYY-MM-DD"
        gender: selectedGender === 0 ? "male" : "female",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setIsLoading(false);
      console.error("APpppp", response.status);

      if (response.status === 201) {
        Alert.alert( response.data.message);

        navigation.navigate("signin");
      } else if (response.status === 400) {
        Alert.alert("Request failed with status code:", response.data.message);
      } else {
        Alert.alert("Request failed with status code:", response.status.toString());
      }
    })
    .catch((error) => {
      setIsLoading(false);

      if (error.response) {
        // Handle API request error
        console.error("API Error:", error.response.data);
        Alert.alert("Error", "An error occurred while signing up: " + error.response.data.message);
      } else {
        // Handle other errors
        console.error("API Error:", error);
        Alert.alert("Error", "An error occurred while signing up.");
      }
    });
};


  // Use navigation.setOptions to hide the header
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false, // Hide the header for this screen
  //   });
  // }, [navigation]);

  useEffect(() => {
    // Alert(email)
     const fetchData = async () => {
     try {
       // Load token from AsyncStorage
       const storedToken = await AsyncStorage.getItem('token');
 
       if (storedToken) {
         setToken(storedToken);
         
       } else {
         // Handle the case where the token is not available
         console.error('Token not found in AsyncStorage');
         return;
       }
     } catch (error) {
       console.error('Error loading token from AsyncStorage:', error);
       return;
     }
   }
   fetchData()

   fetch("https://halaltravel.ai/ht/api/profile/1")
   .then(response => {
     if (!response.ok) {
       throw new Error("Failed to fetch user data");
     }
     return response.json();
   })
   .then(data => {
     setEmail(data.email);
     setFirstName(data.firstName);
     setLastName(data.lastName);
     setFulllName(`${data.firstName} ${data.lastName}`);
     setCountry(data.phoneNumber.countryCode.substring(1));
     setPhoneNumber(data.phoneNumber.phoneNumber);
    
    setSelectedDate(new Date(data.dtOfBirth));
     setSelectedGender(data.gender === "male" ? 0 : 1);
     setIsLoading(false); 
   })
   .catch(error => {
     console.error("Error fetching user data:", error);
     Alert.alert("Error", "Failed to fetch user data. Please try again later.");
     setIsLoading(false); 
   });
   
     // Check if 'ref' is not empty and log it
    
 
    
 
     navigation.setOptions({
       headerLeft: () => (
         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
           <Icon name="arrow-back" size={25} color="#007AFF" />
         </TouchableOpacity>
       ),
       headerTitle: '',
     });
   }, [navigation,token]);

  const radioProps = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];
  
  const [selectedGender, setSelectedGender] = React.useState(0);
  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render your component with the fetched data
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
      <View style={[styles.signInPageV2, styles.frameFlexBox2]}>
        <View style={styles.frame}>
          <Image
            style={styles.visitmalaysia262Icon}
            resizeMode="cover"
            source={require("./assets/visitmalaysia26-2.png")}
          />
          <View style={styles.frame1}>
            <Text style={styles.welcomeBack}>My Profile</Text>
          </View>

          <View style={styles.radioContainer}>
  <Text style={styles.genderLabel}>Select Gender:</Text>

  {/* Male Radio Button */}
  <TouchableOpacity
    style={[
      styles.radioOption,
      selectedGender === 0 && styles.selectedRadioOption,
    ]}
    onPress={() => setSelectedGender(0)}
  >
    <Text style={styles.radioLabel}>Male</Text>
  </TouchableOpacity>

  {/* Female Radio Button */}
  <TouchableOpacity
    style={[
      styles.radioOption,
      selectedGender === 1 && styles.selectedRadioOption,
    ]}
    onPress={() => setSelectedGender(1)}
  >
    <Text style={styles.radioLabel}>Female</Text>
  </TouchableOpacity>
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
              placeholder="First Name"
              placeholderTextColor={Color.colorDarkslateblue_300}
              style={[styles.email, styles.emailTypo]}
              value={FirstName}
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
              placeholder="Last name"
              placeholderTextColor={Color.colorDarkslateblue_300}
              style={[styles.email, styles.emailTypo]}
              value={LastName}
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
              placeholder="Email"
              placeholderTextColor={Color.colorDarkslateblue_300}
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
            <Text
              placeholder="Date of Birth (DD/MM/YYYY)"
              placeholderTextColor={Color.colorDarkslateblue_300}
              style={[styles.email, styles.emailTypo,]}
              onPress={showDatePicker}
            >  {selectedDate.getFullYear()}-{(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-{selectedDate.getDate().toString().padStart(2, '0')}
</Text>
 <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

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
         <PhoneInput
        ref={phoneRef}
       // initialValue={phoneNumber}
       initialValue={`+${country}${phoneNumber}`}
        onPressFlag={() => phoneRef.current?.selectCountry()}
        initialCountry="my" // Specify your initial country (e.g., 'us' for the United States)
        onChangePhoneNumber={(phoneNumber, selectedCountry) => {
          
          const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, selectedCountry);
          const countryCode = parsedPhoneNumber ? parsedPhoneNumber.countryCallingCode : '';
          console.log(countryCode, countryCode)
        //  setPhoneNumber(phoneNumber);
          //setCountry(countryCode);
        }}
      />


          </View>


         
              <View
            style={[
              styles.emailWrapper,
              
              {
                width: "90%",
                marginTop: 10,
                marginLeft: 20,
              },
            ]}
          >
          <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
              Change your password
              </Text>
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
              placeholder="Old Password"
              placeholderTextColor={Color.colorDarkslateblue_300}
              style={[styles.email, styles.emailTypo]}
              value={oldPassword}
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
              placeholder="New Password"
              placeholderTextColor={Color.colorDarkslateblue_300}
              style={[styles.email, styles.emailTypo]}
              value={newPassword}
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
              placeholder="Confirm Password"
              placeholderTextColor={Color.colorDarkslateblue_300}
              style={[styles.email, styles.emailTypo]}
              value={confirmPassword}
              onChangeText={(text) => setEmail(text)}
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
              Update Profile
              </Text>
            )}
          </TouchableOpacity>
          <View style={[styles.frame7, styles.frameFlexBox, { marginLeft: 20, marginRight: 20 }]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                // Handle the press event here
                // You can add your navigation logic or any other actions you want.
              }}
            >
              <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
              
              </Text>

              
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
              
                // Handle the press event here
                // You can add your navigation logic or any other actions you want.
              }}
            >
              <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
                
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
       
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};






const styles = StyleSheet.create({
  frameFlexBox2: {
   
   
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
    fontSize: FontSize.size_sm,
    textAlign: "left",
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
    color: Color.colorDarkslateblue_300,
   
    height: 20,

  
   
  },
  emailWrapper: {
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
 
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-start",
    marginRight: 80,
    marginTop: 10,
  },
  radioButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the left
    marginTop: 10,
    marginLeft: 20,
  },
  genderLabel: {
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    marginRight: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20, // Adjust as needed
  },
  selectedRadioOption: {
    borderColor: Color.colorMidnightblue_100,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  radioLabel: {
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    marginLeft: 5,
  },
 
});

export default SignInPageV2;
