import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function SimpleButton({ to, children, disabled, from, value }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.dispatch(StackActions.replace(to, { from, value }))
      }
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
