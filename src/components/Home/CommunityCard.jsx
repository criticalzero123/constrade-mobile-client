import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";

export default function CommunityCard({ data, index }) {
  const { width, height } = useWindowDimensions();
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
  return (
    <View
      className={`mr-2 ${index === 0 && " ml-5"}`}
      style={{ width: width * 0.7, height: height * 0.33 }}
    >
      <Image
        source={{ uri: data.image }}
        style={{ width: undefined, resizeMode: "cover" }}
        className="h-1/3 rounded-t-lg"
      />
      <View className="p-3 bg-white h-2/3 justify-between rounded-b-lg">
        <View className="mt-1">
          <Text className="font-bold text-xl">{data.name}</Text>
          <View className="flex-row items-center mt-4">
            <Feather name="lock" size={18} color="gray" />
            <Text className="text-gray-500 ml-3 text-base">
              {data.private ? "Private " : "Public "} group
            </Text>
          </View>
          <View className="my-1"></View>
          <View className="flex-row items-center">
            <Feather name="users" size={18} color="gray" />
            <Text className="text-gray-500 ml-3 text-base">
              {data.memberCount} members
            </Text>
          </View>
        </View>
        <View className="mb-2 flex-row items-center">
          <Image
            source={{ uri: image }}
            className="w-6 h-6 rounded-full mr-3"
          />
          <Text className="text-gray-400">by</Text>
          <Text className="text-black font-semibold ml-1">{data.owner}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
