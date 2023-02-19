import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import picture from "../../../assets/end_pic.png";

export default function EndMessage({ text }) {
  const { width } = useWindowDimensions();
  return (
    <View className="w-full items-center px-12 my-10">
      <Image
        source={picture}
        className="h-32"
        style={{ resizeMode: "contain", width: width * 0.5 }}
      />
      <Text className="text-center text-gray-400">{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
