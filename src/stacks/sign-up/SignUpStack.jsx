import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../screens/sign-up/SignUpScreen";
import SignUpName from "../../screens/sign-up/SignUpName";
import SignUpPassword from "../../screens/sign-up/SignUpPassword";

const Stack = createNativeStackNavigator();

export default function SignUpStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignUpOptions"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={SignUpScreen} name="SignUpOptions" />
      <Stack.Screen component={SignUpName} name="SignUpName" />
      <Stack.Screen component={SignUpPassword} name="SignUpPassword" />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
