import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeUserScreen from "../../screens/welcome-screen/WelcomeUserScreen";
import OtpScreen from "../../screens/Otp/OtpScreen";
import Onboarding from "../../screens/onboarding/OnboardingScreen";
import SignUpStack from "../sign-up/SignUpStack";
import SignInStack from "../sign-in/SignInStack";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      //   initialRouteName="Onboarding"
      initialRouteName="SignIn"
    >
      {/* Stacks */}
      <Stack.Screen name="SignIn" component={SignInStack} />
      <Stack.Screen name="SignUp" component={SignUpStack} />

      {/* Screens */}
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="WelcomeUser" component={WelcomeUserScreen} />
    </Stack.Navigator>
  );
}
