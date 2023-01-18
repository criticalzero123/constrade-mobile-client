import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

export default function SignUpButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.button}>Create an account</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 5,
    backgroundColor: "#CC481F",
    color: "#F5F5F5",
    textAlign: "center",
  },
});
