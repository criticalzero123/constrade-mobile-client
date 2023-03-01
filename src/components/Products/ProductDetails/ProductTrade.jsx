import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

export default function ProductTrade({ route }) {
  const { details } = route.params;
  return (
    <View className="mt-3">
      <View className="flex-row">
        <Feather name="link-2" size={20} color="gray" />
        <View className="ml-2">
          <Text className="capitalize font-semibold text-gray-500 text-base">
            {details.product.preferTrade}
          </Text>
          <Text className="capitalize font-semibold text-base my-1">
            ₱ {details.product.cash}
          </Text>
        </View>
      </View>
      <View className="mt-10">
        <Text className="capitalize mb-2 font-semibold">
          {details.product.deliveryMethod}
        </Text>
        <Text className="capitalize">{details.product.location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
