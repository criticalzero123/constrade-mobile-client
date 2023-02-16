import { Image, StyleSheet, View, Text } from "react-native";
import React from "react";

export default function ImageView({ image, onRemove }) {
  return (
    <View className="relative">
      <Text
        className="absolute top-1 text-gray-300 z-10 right-3"
        onPress={onRemove}
      >
        X
      </Text>

      <Image source={{ uri: image.uri }} className="h-28 w-14 mr-2 " />
    </View>
  );
}

const styles = StyleSheet.create({});
