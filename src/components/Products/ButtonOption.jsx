import { Text, Pressable } from "react-native";
import React from "react";

export default function ButtonOption({ children, onPress }) {
  return (
    <Pressable
      className="w-full border-2 p-4 rounded-lg border-gray-300"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
