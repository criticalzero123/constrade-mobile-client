import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { tempDataItem } from "../../../service/discoverService";
import ItemCard from "../Products/ItemCard";

export default function RecentlyViewed() {
  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between mb-4 px-5">
        <Text className="font-semibold text-lg">Recently viewed</Text>
        <Text className="font-semibold text-lg text-[#CC481F]">See all</Text>
      </View>

      <FlatList
        data={tempDataItem}
        renderItem={({ item, index }) => (
          <ItemCard
            data={item}
            index={index}
            user={item.user}
            person={item.person}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="mx-1" />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
