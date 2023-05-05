import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddReview from "../../screens/review/AddReview";
import SubscriptionScreen from "../../screens/subscription/SubscriptionScreen";
import ListingScreen from "../../screens/user/ListingScreen";
import OtherUserProfile from "../../screens/user/OtherUserProfile";
import ReviewsAndFeedbacks from "../../screens/user/ReviewsAndFeedbacks";

import UserProfile from "../../screens/user/UserProfile";
import UserProfileEdit from "../../screens/user/UserProfileEdit";
import VerificationScreen from "../../screens/user/VerificationScreen";
import WishList from "../../screens/user/WishList";
import SendWalletScreen from "../../screens/wallet/SendWalletScreen";
import SendMoneyReceiptScreen from "../../screens/wallet/SendMoneyReceiptScreen";
import WalletScreen from "../../screens/wallet/WalletScreen";
import HelpCenterStack from "../help-center/HelpCenterStack";
import WalletHistory from "../../screens/wallet/WalletHistory";
import WalletReload from "../../screens/wallet/WalletReload";
import AddCountPost from "../../screens/user/AddCountPost";
import ShowFollowerUsers from "../../screens/user/ShowFollowerUsers";
import ShowFollowingUsers from "../../screens/user/ShowFollowingUsers";

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
      <Stack.Screen component={ShowFollowerUsers} name="ShowFollowerUsers" />
      <Stack.Screen component={ShowFollowingUsers} name="ShowFollowingUsers" />
      <Stack.Screen component={UserProfileEdit} name="UserProfileEdit" />
      <Stack.Screen component={WalletScreen} name="Wallet" />
      <Stack.Screen component={WalletHistory} name="WalletHistory" />
      <Stack.Screen component={WalletReload} name="WalletReload" />
      <Stack.Screen component={SendMoneyReceiptScreen} name="SendReceipt" />
      <Stack.Screen component={SendWalletScreen} name="WalletTransfer" />
      <Stack.Screen component={OtherUserProfile} name="OtherUserProfile" />
      <Stack.Screen component={SubscriptionScreen} name="Subscription" />
      <Stack.Screen component={HelpCenterStack} name="HelpCenter" />
      <Stack.Screen component={AddReview} name="AddReview" />
      <Stack.Screen component={VerificationScreen} name="Verification" />
      <Stack.Screen component={AddCountPost} name="AddCountPost" />
    </Stack.Navigator>
  );
}
