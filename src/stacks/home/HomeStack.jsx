import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();
import Discover from "../../screens/home/Discover";
import SearchResult from "../../screens/home/SearchResult";
import SearchResultCategory from "../../screens/home/SearchResultCategory";
import HomeCommunityScreen from "../../screens/home/HomeCommunityScreen";
import PopularScreen from "../../screens/home/PopularScreen";
import BoostedScreen from "../../screens/home/BoostedScreen";
export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Discover} name="Discover" />
      <Stack.Screen component={BoostedScreen} name="BoostedScreen" />
      <Stack.Screen component={PopularScreen} name="PopularScreen" />
      <Stack.Screen component={SearchResult} name="SearchResult" />
      <Stack.Screen
        component={HomeCommunityScreen}
        name="HomeCommunityScreen"
      />
      {/* This is for the trade method */}
      <Stack.Screen
        component={SearchResultCategory}
        name="SearchResultCategory"
      />
    </Stack.Navigator>
  );
}
