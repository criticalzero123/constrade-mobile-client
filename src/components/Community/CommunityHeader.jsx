import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import discoverImage from "../../../assets/Discover/orange-scenery.jpg";
import { LinearGradient } from "expo-linear-gradient";

export default function CommunityHeader() {
  const { height, width } = useWindowDimensions();

  return (
    <View className="relative" style={{ height: height * 0.25 }}>
      <View className="h-5/6">
        <Image
          source={discoverImage}
          style={{ height: undefined, width: undefined, flex: 1 }}
        />
      </View>

      <LinearGradient
        colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.10)"]}
        className="w-full mb-2 h-5/6 absolute"
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      ></LinearGradient>
      <View
        className="absolute w-full h-full"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row justify-between items-center px-5 py-3">
          <Text className="font-bold text-lg text-black">Communities</Text>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
        <Text className="text-black text-center text-3xl font-bold absolute bottom-0  w-full">
          Find the perfect place just for you.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
