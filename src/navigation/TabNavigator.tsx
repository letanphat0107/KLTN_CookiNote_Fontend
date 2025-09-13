import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens for unauthenticated users
import UnauthenticatedHomeScreen from '../screens/Home/UnauthenticatedHomeScreen';
import CulinaryStoryScreen from '../screens/CulinaryStory/CulinaryStoryScreen';
import { UnauthenticatedTabParamList } from './types';
import HomeScreen from '../screens/Home/HomeScreen';

const Tab = createBottomTabNavigator<UnauthenticatedTabParamList>();

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
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="UnauthHome" 
        component={UnauthenticatedHomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="UnauthStory" 
        component={CulinaryStoryScreen}
        options={{
          tabBarLabel: 'Câu chuyện',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📖</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="UnauthFavorite" 
        component={() => (
          <UnauthenticatedHomeScreen />
        )}
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
