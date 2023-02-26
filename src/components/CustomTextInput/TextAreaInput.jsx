import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function TextAreaInput({ label, value, setValue, placeholder }) {
  return (
    <>
      <Text className="mb-1 text-base">{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={5}
        style={{ height: 100, textAlignVertical: "top" }}
        className="border border-gray-400 rounded py-2 px-4"
      />
    </>
  );
}

const styles = StyleSheet.create({});
