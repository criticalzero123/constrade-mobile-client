import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";

import logo from "../../../assets/icon-nobg.png";

export default function Header({ headerText, bodyText }) {
  const { width } = useWindowDimensions();
  return (
    <>
      <Image
        source={logo}
        style={{ width: width / 6, resizeMode: "contain" }}
        className="self-center"
      />
      <Text className="text-[#011B33] text-3xl font-semibold mb-2 text-center">
        {headerText}
      </Text>
      <Text className="mt-2 text-center text-gray-500 px-10 leading-5">
        {bodyText}
      </Text>
      <View className="my-8"></View>
    </>
  );
}

const styles = StyleSheet.create({});
