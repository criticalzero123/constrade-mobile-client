import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ItemCard({ data, index }) {
  const imageConsole = {
    uri: "https://images.saymedia-content.com/.image/t_share/MTc0MzY1MzUwMzM3NDU1NzUw/most-annoying-monsters-breath-of-the-wild.png",
  };
  const { height, width } = useWindowDimensions();

  return (
    <View
      className={`mb-4 mr-2  ${index === 0 && "ml-5"}`}
      style={{ width: width * 0.45, height: height * 0.25 }}
    >
      <View className="h-3/4 relative overflow-hidden rounded-t-lg">
        <Image
          source={imageConsole}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            resizeMode: "cover",
          }}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.55)"]}
          className="w-full mb-2 h-full absolute"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        ></LinearGradient>
        <View className="w-1/2 h-1/5 absolute bg-[#CC481F] -left-1 top-3 rounded justify-center">
          <Text className="uppercase  font-semibold text-white ml-3">
            {data.tradeType}
          </Text>
        </View>
        <Text className="absolute  bottom-0 py-2 px-1 text-white">
          {" "}
          1 day ago
        </Text>
      </View>
      <View className="bg-white p-2 rounded-b-lg shadow-2xl">
        <View className="flex-row justify-between">
          <Text numberOfLines={1} className="font-semibold">
            {data.title}
          </Text>

          <AntDesign name="hearto" size={18} color="gray" />
        </View>
        <View className="flex-row items-center gap-1 mt-1">
          <Image
            source={{ uri: data.image }}
            className="w-4 h-4 rounded-full mr-1"
          />
          <Text className="text-gray-400">by</Text>
          <Text className="capitalize font-semibold">{data.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
