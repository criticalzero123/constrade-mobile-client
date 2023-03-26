import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddCommunity from "../../screens/community/AddCommunity/AddCommunity";

import Community from "../../screens/community/Community";
import CommunityDetail from "../../screens/community/CommunityDetail/CommunityDetail";
import CommunityEdit from "../../screens/community/CommunityEdit";
import MyCommunity from "../../screens/community/MyCommunity";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator
      initialRouteName="CommunityDiscover"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={Community} name="CommunityDiscover" />
      <Stack.Screen component={MyCommunity} name="MyCommunity" />
      <Stack.Screen component={AddCommunity} name="AddCommunity" />
      <Stack.Screen component={CommunityEdit} name="CommunityEdit" />
      <Stack.Screen component={CommunityDetail} name="CommunityDetail" />
    </Stack.Navigator>
  );
}
