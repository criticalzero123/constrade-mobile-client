import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuStack from "../user/MenuStack";
import Notification from "../../screens/Notification/Notification";
import ProductDetails from "../../screens/Products/ProductDetails/ProductDetails";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Menu"
    >
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Menu" component={MenuStack} />
    </Stack.Navigator>
  );
}
