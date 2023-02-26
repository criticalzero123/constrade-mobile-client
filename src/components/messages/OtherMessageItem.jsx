import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

export default function OtherMessageItem({ image, message }) {
  const { height, width } = useWindowDimensions();
  return (
    <View className="flex-row my-1" style={{ width: width * 0.8 }}>
      <Image
        source={{ uri: image }}
        style={{ width: width * 0.06, height: height * 0.03 }}
        className="rounded-full"
      />
      <Text className="px-4 py-2 bg-gray-200 ml-2 rounded-b-lg rounded-r-lg">
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
