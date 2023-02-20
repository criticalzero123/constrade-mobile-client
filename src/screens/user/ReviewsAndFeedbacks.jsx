import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";

export default function ReviewsAndFeedbacks() {
  return (
    <ContainerSafeView>
      <HeaderArrow headerName="Reviews & Feedbacks" />
      <Text>ReviewsAndFeedbacks</Text>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
