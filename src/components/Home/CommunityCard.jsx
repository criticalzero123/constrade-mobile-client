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
      <Image
        source={{ uri: data.community.imageUrl }}
        style={{ width: undefined, resizeMode: "cover" }}
        className="h-1/3 rounded-t-lg"
      />
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
            source={{ uri: data.owner.user.imageUrl }}
            className="w-6 h-6 rounded-full mr-3"
          />
          <Text className="text-gray-400">by</Text>
          <Text className="text-black font-semibold ml-1">
            {currentUserId === data.community.ownerUserId
              ? "you"
              : data.owner.person.firstName + " " + data.owner.person.lastName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
