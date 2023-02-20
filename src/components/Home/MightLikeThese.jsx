import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { tempDataItem } from "../../../service/discoverService";
import ItemCard from "../Products/ItemCard";

export default function MightLikeThese() {
  return (
    <View className="w-full">
      <View className="px-5">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-lg">You might like these</Text>
          <Text className="font-semibold text-lg text-[#CC481F]">See all</Text>
        </View>
        <Text className="text-gray-400 w-3/4 text-base mt-1 mb-4">
          Looks like you are recently looking for a console game. Here's what we
          got for you!
        </Text>
      </View>
      <FlatList
        data={tempDataItem}
        renderItem={({ item, index }) => <ItemCard data={item} index={index} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="mx-1" />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
