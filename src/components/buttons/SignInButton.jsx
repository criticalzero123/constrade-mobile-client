import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";

export default function SignInButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.button}>Sign in</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    color: "#CC481F",
    textAlign: "center",
  },
});
