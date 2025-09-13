import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import HomeScreen from '../screens/Home/HomeScreen';
import CulinaryStoryScreen from '../screens/CulinaryStory/CulinaryStoryScreen';
import FavoriteScreen from '../screens/Favorite/FavoriteScreen';

import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="CulinaryStory" 
        component={CulinaryStoryScreen}
        options={{
          tabBarLabel: 'Câu chuyện',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📖</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Favorite" 
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Yêu thích',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>❤️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
