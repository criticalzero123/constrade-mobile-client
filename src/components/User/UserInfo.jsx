import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import backImage from "../../../assets/Discover/orange-scenery.jpg";
import { useNavigation } from "@react-navigation/native";

export default function UserInfo({ headerName, shareable = true }) {
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const navigation = useNavigation();

  return (
    <View>
      <Image
        source={backImage}
        className="absolute w-full h-4/6"
        style={{ resizeMode: "cover" }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.35)", "rgba(36, 33, 32, 1)"]}
        className="w-full h-4/6 absolute"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      ></LinearGradient>

      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row justify-between mt-3 mb-4">
          <View className="flex-row">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text className="ml-2 text-lg font-semibold text-white">
              {headerName}
            </Text>
          </View>
          {shareable && <AntDesign name="sharealt" size={21} color="white" />}
        </View>
        <View className="items-center">
          <View className=" items-center">
            <View className="p-1 border-2 border-[#FF6838] rounded-full items-center ">
              <Image
                source={{ uri: image }}
                className="w-24 h-24 rounded-full"
              />
            </View>
            <Text className="text-white font-semibold px-4 py-1 rounded-2xl bg-[#FF6838] absolute bottom-0">
              VERIFIED
            </Text>
          </View>

          <Text className="text-white capitalize font-semibold text-lg mt-4">
            John Does
          </Text>
          <Text className="text-gray-300 mt-1 mb-8">
            Somewhere in the middle, Cebu
          </Text>

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
