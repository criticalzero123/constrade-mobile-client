import { Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function ButtonOptionActive({ children, onPress }) {
  return (
    <LinearGradient
      colors={["#E54A43", "#FB8B61"]}
      className="w-full rounded-lg"
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <Pressable className="w-full p-4" onPress={onPress}>
        {children}
      </Pressable>
    </LinearGradient>
  );
}
