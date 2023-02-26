import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { tempDataItem } from "../../../service/discoverService";
import ItemCard from "../Products/ItemCard";

export default function DealsNearYou() {
  return (
    <View className="w-full">
      <View className="flex-row justify-between mb-4 px-5">
        <Text className="text-lg font-semibold">Deals near you</Text>
        <Text className="text-lg font-semibold text-[#CC481F]">See all</Text>
      </View>
      <FlatList
        data={tempDataItem}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ItemCard
            data={item}
            index={index}
            user={item.user}
            person={item.person}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
