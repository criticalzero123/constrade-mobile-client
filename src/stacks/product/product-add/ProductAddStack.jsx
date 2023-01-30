import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddProductOptions from "../../../screens/Products/AddProduct/AddProductOptions";
import AddProductItemDetails from "../../../screens/Products/AddProduct/AddProductItemDetails";

const Stack = createNativeStackNavigator();

export default function ProductAddStack() {
  return (
    <Stack.Navigator
      initialRouteName="AddProductOptions"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={AddProductOptions} name="AddProductOptions" />
      <Stack.Screen
        component={AddProductItemDetails}
        name="AddProductItemDetails"
      />
    </Stack.Navigator>
  );
}
