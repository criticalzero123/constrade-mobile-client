import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";

export default function UserInfo() {
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  return (
    <View className="items-center">
      <View className=" items-center">
        <View className="p-1 border-2 border-[#FF6838] rounded-full items-center ">
          <Image source={{ uri: image }} className="w-24 h-24 rounded-full" />
        </View>
        <Text className="text-white font-semibold px-4 py-1 rounded-2xl bg-[#FF6838] absolute bottom-0">
          VERIFIED
        </Text>
      </View>

      <Text className="text-white capitalize font-semibold text-lg mt-2">
        Mike Andrew Fernandez
      </Text>
      <Text className="text-gray-300 mb-5">Argao, Cebu</Text>

      <View className="w-full flex-row justify-between p-5 rounded-md bg-[#508CC7]">
        <View className="items-center">
          <Text className="font-bold text-xl text-white">1.6k</Text>
          <Text className="mt-3 opacity-75 text-white">Followers</Text>
        </View>
        <View className="border-l border-[#F7FAFC26]"></View>
        <View className="items-center">
          <View className="flex-row items-center">
            <FontAwesome name="star" size={20} color="white" />
            <Text className="font-bold text-xl text-white ml-2">4.5</Text>
          </View>
          <Text className="mt-3 opacity-75 text-white">Ratings</Text>
        </View>
        <View className="border-l border-[#F7FAFC26]"></View>
        <View className="items-center">
          <Text className="font-bold text-xl text-white">80</Text>
          <Text className="mt-3 opacity-75 text-white">Following</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
