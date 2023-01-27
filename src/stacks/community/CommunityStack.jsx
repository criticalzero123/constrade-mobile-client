import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Community from "../../screens/community/Community";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator
      initialRouteName="CommunityInitial"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={Community} name="CommunityInitial" />
    </Stack.Navigator>
  );
}
