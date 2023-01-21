import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function PasswordTextInput({ password, setPassword }) {
  return (
    <View>
      <Text className="mb-1 ">Password</Text>
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        className="border py-2 px-3 rounded border-gray-400"
        textContentType="password"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
