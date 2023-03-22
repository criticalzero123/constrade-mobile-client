import { Image, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import useGetProductId from "../../../hooks/Product/useGetProductId";
import ProductDescription from "../../../components/Products/ProductDetails/ProductDescription";
import ProductTrade from "../../../components/Products/ProductDetails/ProductTrade";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductImageDisplayList from "../../../components/Products/ProductDetails/ProductImageDisplayList";
import { useState } from "react";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";

const Tab = createMaterialTopTabNavigator();

export default function ProductDetails({ route }) {
  const { productId } = route.params;
  const { user } = useGetCurrentUser();

  const { height } = useWindowDimensions();
  const { data } = useGetProductId(productId, user.userId);
  const [imageDisplay, setImageDisplay] = useState(
    data && data.product.thumbnailUrl
  );

  if (data) {
    return (
      <ContainerSafeView>
        <HeaderArrow headerName="Item details" />
        <Image
          style={{ height: height * 0.3 }}
          className="w-full"
          source={{
            uri: imageDisplay ? imageDisplay : data.product.thumbnailUrl,
          }}
        />
        <ProductImageDisplayList
          images={data && data.images}
          setImageDisplay={setImageDisplay}
        />

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
            initialParams={{ details: data }}
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
            initialParams={{ details: data }}
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
