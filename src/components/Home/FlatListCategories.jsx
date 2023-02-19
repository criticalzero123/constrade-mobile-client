import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { categoriesData } from "../../../service/discoverService";

import { Entypo } from "@expo/vector-icons";

export default function FlatListCategories() {
  const { width } = useWindowDimensions();

  const Item = ({ item, index }) => (
    <View
      className={`relative h-32 rounded-lg mr-2 ${index === 0 && "ml-5"}`}
      style={{ width: width * 0.7 }}
    >
      <Image
        source={item.image}
        style={{
          height: undefined,
          width: undefined,
          flex: 1,
        }}
        className="rounded-lg"
      />
      <View className="bg-black opacity-70 w-full h-full absolute rounded-lg"></View>
      <View className="absolute flex w-full h-full items-center justify-center rounded-lg">
        <Text className="text-gray-400 font-semibold text-lg">Browse</Text>
        <Text className="text-white font-semibold text-2xl">{item.title}</Text>
        <View className="flex-row items-center mt-3">
          <Entypo name="megaphone" size={24} color={"#FF6838"} />
          <Text className="text-[#FF6838] ml-1  text-xl font-semibold ">
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="w-full">
      <Text className="font-semibold text-lg mb-1 ml-5">
        Browse by categories
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoriesData}
        renderItem={({ item, index }) => <Item index={index} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
