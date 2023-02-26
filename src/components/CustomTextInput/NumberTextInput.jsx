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
      <Text className=" text-base mb-2">{label}</Text>
      <TextInput
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        className="border px-4 py-2 rounded border-gray-400"
      />
    </>
  );
}

const styles = StyleSheet.create({});
