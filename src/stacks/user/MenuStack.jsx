import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import HomeStack from "../home/HomeStack";
import UserStack from "./UserStack";
import CommunityStack from "../community/CommunityStack";
import MessagesStack from "../messages/MessagesStack";
import ProductAddStack from "../product/product-add/ProductAddStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export default function MenuStack() {
  return (
    <Tab.Navigator
      // initialRouteName="AddProduct"
      initialRouteName="Home"
      // initialRouteName="User"
      // initialRouteName="Message"
      // initialRouteName="Community"
      screenOptions={{
        tabBarActiveTintColor: "#CC481F",
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={CommunityStack}
        name="Community"
        options={{
          // tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        component={ProductAddStack}
        name="AddProduct"
        options={{
          tabBarLabel: "",
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-sharp" size={50} color="#CC481F" />
          ),
        }}
      />
      <Tab.Screen
        component={MessagesStack}
        name="Message"
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={UserStack}
        name="User"
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Me",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={22} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "#242120",
            borderTopColor: "#FFFFFF",
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
}
