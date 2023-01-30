import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();
import Discover from "../../screens/home/Discover";
export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Discover} name="Discover" />
    </Stack.Navigator>
  );
}
