import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReviewsByYou from "../../components/Reviews/ReviewsByYou";
import ReviewsByOthers from "../../components/Reviews/ReviewsByOthers";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

const Tab = createMaterialTopTabNavigator();

export default function ReviewsAndFeedbacks({ route }) {
  const { user: otherUser } = route.params;
  const { user } = useGetCurrentUser();
  return (
    <ContainerSafeView>
      <HeaderArrow headerName="Reviews & Feedbacks" />
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
            width: user.userId === otherUser.userId ? "100%" : "40%",
            marginLeft: 20,
          },
        }}
      >
        {user.userId !== otherUser.userId && (
          <Tab.Screen
            name="ReviewsByYou"
            component={ReviewsByYou}
            options={{
              tabBarLabel: "Reviews you made",
              tabBarLabelStyle: {
                textTransform: "capitalize",
              },
            }}
            initialParams={{ otherUserId: otherUser.userId, user: user }}
          />
        )}
        <Tab.Screen
          name="ReviewsByOthers"
          component={ReviewsByOthers}
          options={{
            tabBarLabel: "Reviews from others",
            tabBarLabelStyle: {
              textTransform: "capitalize",
            },
          }}
          initialParams={{ otherUserId: otherUser.userId, user: user }}
        />
      </Tab.Navigator>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
