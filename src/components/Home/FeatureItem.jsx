import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import photo from "../../../assets/Discover/exclusive-feature.jpg";

export default function FeatureItem({ item, index }) {
  const { width, height } = useWindowDimensions();

  return (
    <View
      className={`relative mr-2 ${index === 0 && "ml-5"}`}
      style={{ width: width * 0.85, height: height * 0.2 }}
    >
      <Image
        source={photo}
        style={{
          width: undefined,
          height: undefined,
          flex: 1,
          borderRadius: 10,
        }}
      />
      <View
        className="w-full h-full opacity-80 bg-black absolute"
        style={{ borderRadius: 10 }}
      ></View>
      <View className="absolute w-full h-full items-center justify-center px-14">
        <View className="flex-row items-center mb-5 ">
          <MaterialCommunityIcons
            name="star-settings-outline"
            size={24}
            color="#FF835C"
          />
          <Text className="uppercase ml-2 text-[#FF835C] font-bold text-lg">
            exclusive feature
          </Text>
        </View>
        <Text className="text-white text-center font-bold text-lg">
          {item.title}
        </Text>
        <Text className="text-gray-300 text-center mt-2 text-base">
          {item.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
