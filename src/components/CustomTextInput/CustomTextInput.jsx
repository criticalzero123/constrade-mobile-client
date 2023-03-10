import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function CustomTextInput({
  value,
  setValue,
  label,
  placeholder,
  name,
}) {
  return (
    <View>
      <Text className="text-left mb-2 text-base">{label}</Text>
      <TextInput
        onChangeText={setValue}
        value={value}
        placeholder={placeholder}
        className="border py-2 px-4 rounded border-gray-400"
        autoCapitalize={name ? "words" : "none"}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
