import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeader = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to set selectedDate to the current date
  const handleBackPress = () => {
    setSelectedDate(new Date());
   // Alert.alert("BackPress",selectedDate)
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      {navigation && navigation.canGoBack() ? (
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-left" color="#202756" size={24} />
        </TouchableOpacity>
      ) : null}

      {/* <Image
        source={require('./assets/visitmalaysia.png')}
        style={styles.logo}
      />

      <Image
        source={require('./assets/bell.png')}
        style={styles.icon}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});

export default CustomHeader;
