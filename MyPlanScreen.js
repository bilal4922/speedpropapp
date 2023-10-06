import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyPlanScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Plan Screen</Text>
      {/* Add your plan details and options here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyPlanScreen;
