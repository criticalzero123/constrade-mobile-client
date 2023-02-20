import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderArrow({ headerName }) {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between mt-3 mb-4">
      <View className="flex-row">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="ml-4 text-lg font-semibold text-black">
          {headerName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
