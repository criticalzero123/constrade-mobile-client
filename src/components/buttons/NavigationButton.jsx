import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function NavigationButton({ to, type, value }) {
  const navigation = useNavigation();

  const onValidate = () => {
    navigation.navigate(to, { value, type });
  };

  return (
    <Pressable
      onPress={onValidate}
      className="w-full bg-[#CC481F] py-4 rounded"
    >
      <Text className="text-center font-semibold text-white text-base ">
        {type === "signin" ? "Continue" : "Get OTP"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
