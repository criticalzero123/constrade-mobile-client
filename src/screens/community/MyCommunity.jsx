import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CommunityCreated from "./CommunityCreated";
import CommunityJoined from "./CommunityJoined";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";

const Tab = createMaterialTopTabNavigator();

export default function MyCommunity() {
  useHideBottomTab();

  return (
    <ContainerSafeView>
      <HeaderArrow headerName="My communities" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
          tabBarStyle: {
            backgroundColor: "rgba(0,0,0,0)",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0,0,0,0.1)",
            shadowColor: "white",
          },
          tabBarInactiveTintColor: "rgba(0,0,0,0.3)",
          tabBarActiveTintColor: "rgba(204,72,31,1)",
          tabBarIndicatorStyle: {
            backgroundColor: "rgba(204,72,31,0.65)",
            height: "4%",
          },
        }}
      >
        <Tab.Screen
          name="CommunityCreated"
          component={CommunityCreated}
          options={{
            tabBarLabel: "Create by you",
            tabBarLabelStyle: {
              textTransform: "capitalize",
            },
          }}
        />
        <Tab.Screen
          name="CommunityJoined"
          component={CommunityJoined}
          options={{
            tabBarLabel: "Joined by you",
            tabBarLabelStyle: { textTransform: "capitalize" },
          }}
        />
      </Tab.Navigator>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
