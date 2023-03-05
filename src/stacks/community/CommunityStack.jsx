import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddCommunity from "../../screens/community/AddCommunity/AddCommunity";

import Community from "../../screens/community/Community";
import CommunityDetail from "../../screens/community/CommunityDetail/CommunityDetail";
import MyCommunity from "../../screens/community/MyCommunity";

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
      <Stack.Screen component={MyCommunity} name="MyCommunity" />
      <Stack.Screen component={AddCommunity} name="AddCommunity" />
      <Stack.Screen component={CommunityDetail} name="CommunityDetail" />
    </Stack.Navigator>
  );
}
