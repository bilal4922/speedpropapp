import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.openDrawer(); // This function will open the drawer
  };

  return (
    <View style={styles.headerContainer}>
      {/* Left: Custom Menu Icon */}
      {/* Replace 'Menu.png' with your menu icon source */}
      <TouchableOpacity onPress={openMenu}>
        <Image
          source={require('./assets/Menu.png')} 
          style={styles.icon}
        />
      </TouchableOpacity>

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
