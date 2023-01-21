import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function PhoneTextInput({ setPhone, phone }) {
  return (
    <View>
      <Text className="text-left mb-1">phone address</Text>
      <TextInput
        onChangeText={setPhone}
        value={phone}
        placeholder="e.g. +63 922 333 4444"
        keyboardType="number-pad"
        className="border py-2 px-3 rounded border-gray-400"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
