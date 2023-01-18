import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function EmailTextInput({ setEmail, email }) {
  return (
    <View>
      <Text className="text-left mb-1">Email address</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="e.g. johndoe@email.com"
        keyboardType="email-address"
        className="border py-2 px-3 rounded border-gray-400"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
