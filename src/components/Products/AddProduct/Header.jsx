import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function Header({ onPress, title }) {
  return (
    <View className="flex-row items-center mt-2 mb-4">
      <Pressable onPress={onPress}>
        <Ionicons name="arrow-back" size={26} color="black" />
      </Pressable>
      <Text className="ml-3 text-base font-semibold">{title}</Text>
    </View>
  );
}
