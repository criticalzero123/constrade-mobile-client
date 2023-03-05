import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";

export default function CommunityDetail({ route }) {
  const { id } = route.params;

  console.log(id);
  return (
    <ContainerSafeView>
      <Text>CommunityDetail</Text>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
