import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import ChatHeader from "../../components/messages/ChatHeader";

export default function PersonalMessage() {
  return (
    <ContainerSafeView>
      <View className="mt-2" />
      <ChatHeader />
      <Text>PersonalMessage</Text>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
