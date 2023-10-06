import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'; // Correct import

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const currentRouteName = state.routes[state.index].name;

  if (currentRouteName === 'signin' || currentRouteName === 'signup') {
    return null; // Hide the tab bar for signin and signup screens
  }


};

export default CustomTabBar;
