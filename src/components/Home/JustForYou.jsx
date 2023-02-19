import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemCard from "./ItemCard";
import { tempDataItem } from "../../../service/discoverService";

export default function JustForYou() {
  return (
    <View className="">
      <View className="flex-row justify-between mb-2 px-5">
        <Text className="font-semibold text-lg">Just for you</Text>
        <Text className="text-[#CC481F] font-semibold text-lg">See all</Text>
      </View>
      <View className="w-full flex-row flex-wrap justify-center ml-2">
        {tempDataItem.map((data) => (
          <ItemCard data={data} key={data.id} />
        ))}
      </View>
      <Text className="text-[#CC481F] font-semibold text-base text-center">
        Show more
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
