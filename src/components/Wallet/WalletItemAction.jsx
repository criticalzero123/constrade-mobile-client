import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function WalletItemAction({ data }) {
  return (
    <View className="items-center py-2 px-2">
      <Text className="mb-2">{data.icon}</Text>
      <Text className="text-gray-600 font-semibold">{data.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
