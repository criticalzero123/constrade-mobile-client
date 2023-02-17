import { Text, Pressable } from "react-native";
import React from "react";

export default function ButtonOption({ data, onPress }) {
  return (
    <Pressable
      className="w-full border-2 p-4 rounded-lg border-gray-300 mb-2"
      onPress={onPress}
    >
      <Text className="mb-2 font-bold text-gray-600 text-base">
        {data.title}{" "}
        {!data.active && (
          <Text className="text-gray-300 text-sm">(coming soon)</Text>
        )}
      </Text>
      <Text className="text-gray-400">{data.description}</Text>
    </Pressable>
  );
}
