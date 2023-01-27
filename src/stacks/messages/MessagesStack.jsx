import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Messages from "../../screens/messages/Messages";
const Stack = createNativeStackNavigator();

export default function MessagesStack() {
  return (
    <Stack.Navigator
      initialRouteName="MessageList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Messages} name="MessageList" />
    </Stack.Navigator>
  );
}
