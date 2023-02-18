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

  const Item = ({ title, image, description }) => (
    <View className="relative h-32 rounded-lg" style={{ width: width * 0.7 }}>
      <Image
        source={image}
        style={{
          height: undefined,
          width: undefined,
          flex: 1,
        }}
        className="rounded-lg"
      />
      <View className="bg-black opacity-60 w-full h-full absolute rounded-lg"></View>
      <View className="absolute flex w-full h-full items-center justify-center rounded-lg">
        <Text className="text-gray-400 font-semibold text-lg">Browse</Text>
        <Text className="text-white font-semibold text-2xl">{title}</Text>
        <View className="flex-row items-center mt-3">
          <Entypo name="megaphone" size={24} color={"#FF6838"} />
          <Text className="text-[#FF6838] ml-1  text-xl font-semibold ">
            {description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="w-full">
      <Text className="mt-4 font-semibold text-lg mb-1">
        Browse by categories
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoriesData}
        renderItem={({ item }) => (
          <Item
            key={item.id}
            title={item.title}
            image={item.image}
            description={item.description}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
