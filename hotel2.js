import React, { useEffect, useState } from 'react';
import { View, Button, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {SliderBox} from 'react-native-image-slider-box';


const HomeScreen = () => {
  const navigation = useNavigation();

  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
    // Add more image URLs as needed
  ]);

  const handleImagePressed = (index) => {
    console.warn(`Image ${index} pressed`);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Back"
          color="#007AFF"
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <SliderBox
        images={images}
        sliderBoxHeight={300}
        onCurrentImagePressed={handleImagePressed}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        resizeMode="cover"
        paginationBoxStyle={styles.paginationBoxStyle}
        dotStyle={styles.dotStyle}
        ImageComponentStyle={styles.imageComponentStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paginationBoxStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  imageComponentStyle: {
    borderRadius: 0,
    width: '100%',
    marginTop: 5,
  },
});

export default HomeScreen;
