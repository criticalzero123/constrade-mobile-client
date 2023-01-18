import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import SignInScreen from "../../screens/sign-in/SignInScreen";
import EmailSignInScreen from "../../screens/sign-in/EmailSignInScreen";
import EmailOtpScreen from "../../screens/sign-in/EmailOtpScreen";

export default function SignInStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignInOptions"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInOptions" component={SignInScreen} />
      <Stack.Screen name="SignInEmail" component={EmailSignInScreen} />
      <Stack.Screen name="SignInEmailOtp" component={EmailOtpScreen} />
    </Stack.Navigator>
  );
}
