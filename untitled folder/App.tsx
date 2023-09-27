// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import web from './webview';
import signin from './signin';
import signup from './signup';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="signin">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="web" component={web} />
        <Stack.Screen name="signin" component={signin} />
        <Stack.Screen name="signup" component={signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
