import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import UserProfile from "../../screens/user/UserProfile";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={UserProfile} name="UserProfile" />
    </Stack.Navigator>
  );
}
