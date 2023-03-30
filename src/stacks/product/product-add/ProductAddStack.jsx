import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddProductOptions from "../../../screens/Products/AddProduct/AddProductOptions";
import AddProductDeliveryDetails from "../../../screens/Products/AddProduct/AddProductDeliveryDetails";
import AddProductSearchItems from "../../../screens/Products/AddProduct/AddProductSearchItems";
import AddProductSearchResults from "../../../screens/Products/AddProduct/AddProductSearchResults";
import AddProductItemDetails1 from "../../../screens/Products/AddProduct/AddProductItemDetails1";
import AddProductItemDetails2 from "../../../screens/Products/AddProduct/AddProductItemDetails2";

const Stack = createNativeStackNavigator();

export default function ProductAddStack() {
  return (
    <Stack.Navigator
      initialRouteName="AddProductOptions"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={AddProductOptions} name="AddProductOptions" />
      <Stack.Screen
        component={AddProductSearchItems}
        name="AddProductSearchItems"
      />
      <Stack.Screen
        component={AddProductItemDetails1}
        name="AddProductItemDetails1"
      />
      <Stack.Screen
        component={AddProductItemDetails2}
        name="AddProductItemDetails2"
      />

      <Stack.Screen
        component={AddProductSearchResults}
        name="AddProductSearchResults"
      />

      <Stack.Screen
        component={AddProductDeliveryDetails}
        name="AddProductDeliveryDetails"
      />
    </Stack.Navigator>
  );
}
