import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";

export default function WishList() {
  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Wishlist"} />
      <Text>WishList</Text>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
