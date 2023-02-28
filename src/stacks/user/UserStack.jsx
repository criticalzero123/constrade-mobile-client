import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyListing from "../../screens/User/MyListing";
import OtherUserProfile from "../../screens/User/OtherUserProfile";
import ReviewsAndFeedbacks from "../../screens/User/ReviewsAndFeedbacks";

import UserProfile from "../../screens/User/UserProfile";
import UserProfileEdit from "../../screens/User/UserProfileEdit";
import WishList from "../../screens/User/WishList";
import WalletScreen from "../../screens/Wallet/WalletScreen";

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
      <Stack.Screen component={OtherUserProfile} name="OtherUserProfile" />
      <Stack.Screen component={MyListing} name="MyListing" />
      <Stack.Screen component={WishList} name="WishList" />
      <Stack.Screen component={ReviewsAndFeedbacks} name="Reviews" />
      <Stack.Screen component={UserProfileEdit} name="UserProfileEdit" />
      <Stack.Screen component={WalletScreen} name="Wallet" />
    </Stack.Navigator>
  );
}
