import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function SimpleButton({ to, children, disabled, from }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(to, { from })}
      className={`${
        disabled ? "bg-[#cc471f57] " : "bg-[#CC481F] "
      }w-full py-4 rounded`}
      disabled={disabled}
    >
      <Text className="text-center font-semibold text-white text-base ">
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
