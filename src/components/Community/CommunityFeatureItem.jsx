import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import photo from "../../../assets/Discover/exclusive-feature.jpg";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CommunityFeatureItem() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View
      className={`relative `}
      style={{ width: width * 0.9, height: height * 0.2 }}
    >
      <Image
        source={photo}
        style={{
          width: undefined,
          height: undefined,
          flex: 1,
          borderRadius: 10,
        }}
      />
      <View
        className="w-full h-full opacity-70 bg-black absolute"
        style={{ borderRadius: 10 }}
      ></View>
      <View className="absolute w-full h-full items-center justify-center px-5">
        <Text className="text-white text-center font-bold text-xl">
          Craft a place for everyone
        </Text>
        <Text className="text-gray-300 text-center mt-2 text-base">
          Time to make a new place where gamers can trade and discuss with each
          other
        </Text>
        <View className="flex-row items-center mt-5 ">
          <FontAwesome5 name="users" size={18} color="#FF835C" />
          <Pressable onPress={() => navigation.navigate("AddCommunity")}>
            <Text className=" ml-2 text-[#FF835C] font-bold text-lg">
              Create my community
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
