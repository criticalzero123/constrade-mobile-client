import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function CommunityCard({
  data,
  index,
  currentUserId,
  fullWidth = false,
  home = false,
}) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const VisibilityPrivate = () => {
    return (
      <View className="flex-row items-center">
        <Entypo name="lock" size={20} color="silver" />
        <Text className="ml-2 capitalize text-[#8193A3]">Private group</Text>
      </View>
    );
  };

  const VisibilityPublic = () => {
    return (
      <View className="flex-row items-center">
        <MaterialIcons name="public" size={20} color="gray" />
        <Text className="ml-2 capitalize text-[#8193A3]">Public group</Text>
      </View>
    );
  };

  const handlePress = () => {
    if (home) {
      navigation.navigate("Community", {
        screen: "CommunityDetail",
        params: {
          id: data.community.communityId,
        },
      });
    } else {
      navigation.navigate("CommunityDetail", {
        id: data.community.communityId,
      });
    }
  };

  return (
    <Pressable
      className={`mr-2 ${index === 0 && " ml-5"} ${
        home ? "bg-white" : "bg-gray-100"
      } rounded-lg shadow-2xl ${home && "mb-5"}`}
      style={{
        width: fullWidth ? width * 0.85 : width * 0.7,
        height: height * 0.33,
      }}
      onPress={handlePress}
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
          <View className="mt-4">
            {data.community.visibility === "private" ? (
              <VisibilityPrivate />
            ) : (
              <VisibilityPublic />
            )}
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
