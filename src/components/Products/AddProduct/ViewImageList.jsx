import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ViewImageList({ imageList }) {
  return (
    <View className="flex-row ">
      {imageList.map((image) => (
        <View>
          <Image
            source={{ uri: image.uri }}
            key={image.assetId}
            className="w-16 h-16 mr-2"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
