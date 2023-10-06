// // App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailsScreen from './DetailsScreen';
import web from './webview';
import signin from './signin';
import signup from './signup';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
 import SettingsScreen from './SettingsScreen';
  import MyPlanScreen from './MyPlanScreen';
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
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './HomeScreen';
// import ProfileScreen from './ProfileScreen';
// import SettingsScreen from './SettingsScreen';
// import MyPlanScreen from './MyPlanScreen';

// import Ionicons from 'react-native-vector-icons/FontAwesome';


// import Ioniconsm from 'react-native-vector-icons/MaterialIcons';
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Create a custom tab navigator for the Home screen
// const HomeTabNavigator = () => (
//   <Tab.Navigator
//     tabBarOptions={{
//       activeTintColor: 'blue', // Change the color to your liking
//     }}
//   >
//     <Tab.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         tabBarLabel: 'Home',
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="home" color={color} size={size} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         tabBarLabel: 'Profile',
//         tabBarIcon: ({ color, size }) => (
//           <Ioniconsm name="settings-input-svideo" color={color} size={size} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Settings"
//       component={SettingsScreen}
//       options={{
//         tabBarLabel: 'Settings',
//         tabBarIcon: ({ color, size }) => (
//           <Ioniconsm name="settings" color={color} size={size} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="MyPlan"
//       component={MyPlanScreen}
//       options={{
//         tabBarLabel: 'My Plan',
//         tabBarIcon: ({ color, size }) => (
//           <Ioniconsm name="display-settings" color={color} size={size} />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// );

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="HomeTab">
//         <Stack.Screen
//           name="HomeTab"
//           component={HomeTabNavigator}
//           options={{ headerShown: false }} // Hide the header for the HomeTab
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './HomeScreen';
// import ProfileScreen from './ProfileScreen';
// import SettingsScreen from './SettingsScreen';
// import MyPlanScreen from './MyPlanScreen';
// import Ionicons from 'react-native-vector-icons/FontAwesome';
// import Ioniconsm from 'react-native-vector-icons/MaterialIcons';
// import web from './webview';
// import signin from './signin';
// import signup from './signup';
// import DetailsScreen from './DetailsScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const screenOptionsWithoutTitle = {
//   headerTitle: null, // Hide the top navigation bar title for all screens
// };

// const HomeStack = () => (
//   <Stack.Navigator
//     screenOptions={{
//       ...screenOptionsWithoutTitle,
//       headerShown: false,
//       tabBarLabel: null, // Hide the tab label for "Profile"
//       tabBarIcon: null, // Hide the tab icon for "Profile"
//       tabBarVisible: false, // Hide the top navigation bar for all screens
//     }}
//   >
//     <Stack.Screen name="Home" component={HomeScreen}
//      options={{
//       tabBarLabel: null, // Hide the tab label for "Profile"
//       tabBarIcon: null, // Hide the tab icon for "Profile"
//       tabBarVisible: false, // Hide the tab bar for "Profile"
//     }} />
//     <Stack.Screen name="Details" component={DetailsScreen} />
//   </Stack.Navigator>
// );

// const ProfileStack = () => (
//   <Stack.Navigator
//     screenOptions={{
//       ...screenOptionsWithoutTitle,
//       headerShown: false, // Hide the top navigation bar for all screens
//     }}
//   >
//     <Stack.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         tabBarLabel: null, // Hide the tab label for "Profile"
//         tabBarIcon: null, // Hide the tab icon for "Profile"
//         tabBarVisible: false, // Hide the tab bar for "Profile"
//       }}
//     />
//   </Stack.Navigator>
// );

// const SettingsStack = () => (
//   <Stack.Navigator
//     screenOptions={{
//       ...screenOptionsWithoutTitle,
//       headerShown: false, // Hide the top navigation bar for all screens
//     }}
//   >
//     <Stack.Screen name="Settings" component={SettingsScreen} />
//   </Stack.Navigator>
// );

// const MyPlanStack = () => (
//   <Stack.Navigator
//     screenOptions={{
//       ...screenOptionsWithoutTitle,
//       headerShown: false, // Hide the top navigation bar for all screens
//     }}
//   >
//     <Stack.Screen name="MyPlan" component={MyPlanScreen} />
//   </Stack.Navigator>
// );

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator initialRouteName="Home">
//         <Tab.Screen
//           name="Home"
//           component={HomeStack}
//           options={({ route }) => ({
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="home" color={color} size={size} />
//             ),
//             tabBarVisible: route.state?.index === 0, // Hide the tab bar for HomeScreen
//           })}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileStack}
//         />
//         <Tab.Screen
//           name="Settings"
//           component={SettingsStack}
//           options={{
//             tabBarLabel: 'Settings',
//             tabBarIcon: ({ color, size }) => (
//               <Ioniconsm name="settings" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="MyPlan"
//           component={MyPlanStack}
//           options={{
//             tabBarLabel: 'My Plan',
//             tabBarIcon: ({ color, size }) => (
//               <Ioniconsm name="calendar" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// import DetailsScreen from './DetailsScreen';
// import web from './webview';
// import signin from './signin';
// import signup from './signup';

// import HomeScreen from './HomeScreen';
// import ProfileScreen from './ProfileScreen';
// import SettingsScreen from './SettingsScreen';
// import MyPlanScreen from './MyPlanScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Stack Navigator for Home, Details, Web, Signin, Signup
// // Stack Navigator for Home, Details, Web, Signin, Signup
// const HomeStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Details" component={DetailsScreen} />
//       <Stack.Screen name="web" component={web} />
//       <Stack.Screen
//         name="signin"
//         component={signin}
//         options={{
//           headerTitle: null, // Set header title to null
//           headerShown: false, // Hide header
//         }}
//       />
//       <Stack.Screen
//         name="signup"
//         component={signup}
//         options={{ tabBarStyle: { display: 'none' } }}
//       />
//     </Stack.Navigator>
//   );
// };



// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeStack} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//         <Tab.Screen name="MyPlan" component={MyPlanScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
