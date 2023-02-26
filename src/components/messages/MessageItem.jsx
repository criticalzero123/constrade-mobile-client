import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";

export default function MessageItem({ message }) {
  const { width, height } = useWindowDimensions();
  return (
    <View
      className="justify-items-end items-end my-1"
      style={{ marginLeft: width * 0.1 }}
    >
      <Text className="rounded-b-lg rounded-l-lg px-4 py-2 bg-[#D14519] text-white">
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
