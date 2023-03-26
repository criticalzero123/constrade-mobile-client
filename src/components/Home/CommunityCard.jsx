import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function CommunityCard({ data, index, currentUserId }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Pressable
      className={`mr-2 ${index === 0 && " ml-5"} bg-gray-100 rounded-lg`}
      style={{ width: width * 0.7, height: height * 0.33 }}
      onPress={() =>
        navigation.navigate("CommunityDetail", {
          id: data.community.communityId,
        })
      }
    >
      <View style={{ height: height * 0.11 }} className="relative">
        <Image
          source={{ uri: data.community.imageUrl }}
          style={{
            width: undefined,
            height: undefined,
            resizeMode: "cover",
          }}
          className="rounded-t-lg flex-1"
        />
        {data.isJoined && (
          <View
            style={{ borderRadius: 5 }}
            className="flex-row items-center absolute bottom-0 left-0 p-2 m-2 bg-[#CC481F]"
          >
            <Feather name="check" size={15} color="white" />
            <Text className=" text-white ml-2">Joined</Text>
          </View>
        )}
      </View>
      <View className="p-3 h-2/3 justify-between rounded-b-lg">
        <View className="mt-1">
          <Text className="font-bold text-xl">{data.community.name}</Text>
          <View className="flex-row items-center mt-4">
            <Feather name="lock" size={18} color="gray" />
            <Text className="text-gray-500 ml-3 text-base">
              {data.private ? "Private " : "Public "}group
            </Text>
          </View>
          <View className="my-1"></View>
          <View className="flex-row items-center">
            <Feather name="users" size={18} color="gray" />
            <Text className="text-gray-500 ml-3 text-base">
              {data.community.totalMembers} members
            </Text>
          </View>
        </View>
        <View className="mb-2 flex-row items-center">
          <Image
            source={{ uri: data.ownerImage }}
            className="w-6 h-6 rounded-full mr-3"
          />
          <Text className="text-gray-400">by</Text>
          <Text className="text-black font-semibold ml-1">
            {currentUserId === data.community.ownerUserId
              ? "you"
              : data.ownerName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
