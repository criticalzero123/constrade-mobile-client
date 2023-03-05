import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useNavigation } from "@react-navigation/native";

export default function HelpCenter() {
  const navigation = useNavigation();
  return (
    <ContainerSafeView>
      <Text>HelpCenter</Text>
      <Pressable
        className="items-center p-4 bg-gray-400"
        onPress={() => navigation.navigate("SubmitFeedback")}
      >
        <Text className="text-white">Submit System Feedback</Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
