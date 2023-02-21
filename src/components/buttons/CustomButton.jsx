import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CustomButton({ children, disabled, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className={`${
        disabled ? "bg-[#cc471f57] " : "bg-[#CC481F] "
      }w-full py-4 rounded mb-6`}
      disabled={disabled}
    >
      <Text className="text-center font-semibold text-white text-base ">
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
