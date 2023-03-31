import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();
import Discover from "../../screens/home/Discover";
import SearchResult from "../../screens/home/SearchResult";
export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Discover} name="Discover" />
      <Stack.Screen component={SearchResult} name="SearchResult" />
    </Stack.Navigator>
  );
}
