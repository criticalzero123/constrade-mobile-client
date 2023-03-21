import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddReview from "../../screens/review/AddReview";
import SubscriptionScreen from "../../screens/Subscription/SubscriptionScreen";
import ListingScreen from "../../screens/User/ListingScreen";
import OtherUserProfile from "../../screens/User/OtherUserProfile";
import ReviewsAndFeedbacks from "../../screens/User/ReviewsAndFeedbacks";

import UserProfile from "../../screens/User/UserProfile";
import UserProfileEdit from "../../screens/User/UserProfileEdit";
import VerificationScreen from "../../screens/User/VerificationScreen";
import WishList from "../../screens/User/WishList";
import SendWalletScreen from "../../screens/Wallet/SendWalletScreen";
import SendMoneyReceiptScreen from "../../screens/Wallet/SendMoneyReceiptScreen";
import WalletScreen from "../../screens/Wallet/WalletScreen";
import HelpCenterStack from "../help-center/HelpCenterStack";

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
      <Stack.Screen component={ListingScreen} name="MyListing" />
      <Stack.Screen component={WishList} name="WishList" />
      <Stack.Screen component={ReviewsAndFeedbacks} name="Reviews" />
      <Stack.Screen component={UserProfileEdit} name="UserProfileEdit" />
      <Stack.Screen component={WalletScreen} name="Wallet" />
      <Stack.Screen component={SendMoneyReceiptScreen} name="SendReceipt" />
      <Stack.Screen component={SendWalletScreen} name="WalletTransfer" />
      <Stack.Screen component={OtherUserProfile} name="OtherUserProfile" />
      <Stack.Screen component={SubscriptionScreen} name="Subscription" />
      <Stack.Screen component={HelpCenterStack} name="HelpCenter" />
      <Stack.Screen component={AddReview} name="AddReview" />
      <Stack.Screen component={VerificationScreen} name="Verification" />
    </Stack.Navigator>
  );
}
