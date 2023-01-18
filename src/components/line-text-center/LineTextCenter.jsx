import { Text, View } from "react-native";
import React from "react";

export default function LineTextCenter({ text }) {
  return (
    <View className="flex-row my-8">
      <View className="bg-gray-300 h-px flex-1 self-center" />
      <Text className="self-center px-3 text-sm text-gray-400">{text}</Text>
      <View className="bg-gray-300 h-px flex-1 self-center" />
    </View>
  );
}
