import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function WalletItemAction({ data, onPress }) {
  return (
    <Pressable className="items-center py-2 px-2" onPress={onPress}>
      <Text className="mb-1">{data.icon}</Text>
      <Text className="text-gray-600 font-semibold">{data.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
