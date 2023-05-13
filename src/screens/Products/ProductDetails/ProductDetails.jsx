import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import useGetProductId from "../../../hooks/Product/useGetProductId";
import ProductDescription from "../../../components/Products/ProductDetails/ProductDescription";
import ProductTrade from "../../../components/Products/ProductDetails/ProductTrade";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import { ActivityIndicator } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

export default function ProductDetails({ route }) {
  const { productId } = route.params;
  const { user } = useGetCurrentUser();
  const { data } = useGetProductId(productId, user && user.userId);

  if (data === undefined || user === undefined)
    return (
      <ContainerSafeView>
        <HeaderArrow headerName={"Item details"} />
        <View className="justify-center items-center flex-1">
          <ActivityIndicator />
        </View>
      </ContainerSafeView>
    );

  if (data && user) {
    return (
      <ContainerSafeView>
        <HeaderArrow headerName="Item details" />

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
            },
          }}
        >
          <Tab.Screen
            name="ProductDescription"
            component={ProductDescription}
            options={{
              tabBarLabel: "Description",
              tabBarLabelStyle: {
                textTransform: "capitalize",
              },
            }}
          />
          <Tab.Screen
            name="ProductTrade"
            component={ProductTrade}
            options={{
              tabBarLabel: "Trade Details",
              tabBarLabelStyle: { textTransform: "capitalize" },
            }}
          />
        </Tab.Navigator>
      </ContainerSafeView>
    );
  }
}

const styles = StyleSheet.create({});
