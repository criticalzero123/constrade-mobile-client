import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import discoverImage from "../../../assets/Discover/orange-scenery.jpg";

export default function DiscoverHeader() {
  const { height, width } = useWindowDimensions();
  return (
    <View className="relative" style={{ height: height * 0.15 }}>
      <Image
        source={discoverImage}
        style={{ height: undefined, width: undefined, flex: 1 }}
      />
      <View className="absolute w-full h-full bg-black opacity-60"></View>

      <View className="absolute bottom-0 w-full flex-row justify-between items-center px-5 py-3">
        <Text className="font-bold text-lg text-white">Discover</Text>
        {/* <Ionicons name="notifications-outline" size={24} color="white" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
