import { StyleSheet, Text, View } from "react-native";
import React from "react";

import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";

export default function MyListing() {
  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"My Listings"} />
      <Text>MyListing</Text>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
