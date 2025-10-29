import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CulinaryStoryScreen from "../screens/CulinaryStory/CulinaryStoryScreen";
import CulinaryStoryDetailScreen from "../screens/CulinaryStory/CulinaryStoryDetailScreen";

type CulinaryStoryStackParamList = {
  CulinaryStoryList: undefined;
  CulinaryStoryDetail: { storyId: string };
};

const CulinaryStoryStack = createStackNavigator<CulinaryStoryStackParamList>();

const CulinaryStoryNavigator = () => {
  return (
    <CulinaryStoryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CulinaryStoryStack.Screen
        name="CulinaryStoryList"
        component={CulinaryStoryScreen}
      />
      <CulinaryStoryStack.Screen
        name="CulinaryStoryDetail"
        component={CulinaryStoryDetailScreen}
      />
    </CulinaryStoryStack.Navigator>
  );
};

export default CulinaryStoryNavigator;
