import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { communityData } from "../../../service/discoverService";
import CommunityCard from "./CommunityCard";

export default function SuggestedCommunities() {
  return (
    <View className="w-full">
      <View className="px-5">
        <View className="flex-row justify-between ">
          <Text className="font-semibold text-lg">Suggested communities</Text>
          <Text className="font-semibold text-lg text-[#CC481F]">See all</Text>
        </View>
        <Text className="w-4/6 text-gray-400 text-base my-2">
          Join a community now and meet new friends.
        </Text>
      </View>
      <FlatList
        data={communityData}
        renderItem={({ item, index }) => (
          <CommunityCard data={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
