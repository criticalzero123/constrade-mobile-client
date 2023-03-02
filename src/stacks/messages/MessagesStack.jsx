import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import PersonalMessage from "../../screens/messages/PersonalMessage";
import ProductMessage from "../../screens/messages/ProductMessage";
import MessageTopTab from "./MessageTopTab";
const Stack = createNativeStackNavigator();

export default function MessagesStack() {
  return (
    <Stack.Navigator
      initialRouteName="MessageHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={MessageTopTab} name="MessageHome" />
      <Stack.Screen component={PersonalMessage} name="PersonalMessage" />
      <Stack.Screen component={ProductMessage} name="ProductMessage" />
    </Stack.Navigator>
  );
}
