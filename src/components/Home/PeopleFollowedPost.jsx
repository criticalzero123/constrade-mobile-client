import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { tempDataItem } from "../../../service/discoverService";
import ItemCard from "./ItemCard";

export default function PeopleFollowedPost() {
  return (
    <View className="">
      <View className="flex-row justify-between px-5">
        <Text className=" text-lg font-semibold">
          From people you've followed
        </Text>
        <Text className="text-[#CC481F] text-lg font-semibold">See all</Text>
      </View>
      <Text className="text-base text-gray-400 w-4/6 mt-1 mb-4 px-5">
        Top and new items from people you followed!
      </Text>
      <FlatList
        data={tempDataItem}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <ItemCard data={item} index={index} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
