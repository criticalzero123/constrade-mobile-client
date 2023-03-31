import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { categoriesData } from "../../../service/discoverService";

import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FlatListCategories() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const Item = ({ item, index, to }) => (
    <Pressable
      className={`relative h-32 rounded-lg mr-2 ${index === 0 && "ml-5"}`}
      style={{ width: width * 0.7 }}
      onPress={to}
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
        <Text className="text-white  font-semibold text-2xl">{item.title}</Text>
        <View className="flex-row items-center mt-3">
          <Entypo name="megaphone" size={24} color={"#FF6838"} />
          <Text className=" ml-1 text-[#FF6838] text-xl font-semibold ">
            {item.description}
          </Text>
        </View>
      </View>
    </Pressable>
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
        renderItem={({ item, index }) => (
          <Item
            index={index}
            item={item}
            to={() =>
              navigation.navigate("SearchResultCategory", {
                category: item.value,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
