import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function NumberTextInput({
  label,
  value,
  setValue,
  placeholder,
}) {
  return (
    <>
      <Text className=" text-base mb-1">{label}</Text>
      <TextInput
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        className="border p-2 rounded border-gray-300"
      />
    </>
  );
}

const styles = StyleSheet.create({});
