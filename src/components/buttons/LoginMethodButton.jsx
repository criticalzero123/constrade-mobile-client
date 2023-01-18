import { Text, View, Pressable } from "react-native";
import React from "react";

export default function LoginMethodButton({ Icon, text, onPress }) {
  return (
    <Pressable
      className="flex-row py-3 px-9 border items-center justify-center border-[#CC481F] rounded w-40"
      onPress={onPress}
    >
      {Icon}
      <View className="mx-1"></View>
      <Text className="text-[#CC481F] font-semibold text-base">{text}</Text>
    </Pressable>
  );
}
