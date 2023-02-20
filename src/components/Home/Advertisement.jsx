import { StyleSheet, View, Image } from "react-native";
import React from "react";

export default function Advertisement({ noPadding = false }) {
  const image =
    "https://revealbot.com/blog/content/images/2021/01/07_fb_ads_2_tiny.jpg";

  return (
    <View className={`w-full h-16 ${!noPadding && " px-5"}`}>
      <Image
        source={{ uri: image }}
        className="h-full"
        style={{ resizeMode: "cover" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
