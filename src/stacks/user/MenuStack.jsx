import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import React from "react";
import Home from "../../screens/home/Home";

export default function MenuStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen component={Home} name="Home" />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
