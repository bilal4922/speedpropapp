import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon library

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Left: Custom Back Icon */}
      {navigation && navigation.canGoBack() ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left"  color="#202756" size={24}  />
        </TouchableOpacity>
      ) : null}

      {/* Center: App Logo */}
      {/* Replace 'visitmalaysia.png' with your app logo source */}
      <Image
        source={require('./assets/visitmalaysia.png')}
        style={styles.logo}
      />

      {/* Right: Custom Notification Icon */}
      {/* Replace 'bell.png' with your notification icon source */}
      <Image
        source={require('./assets/bell.png')}
        style={styles.icon}
      />
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
