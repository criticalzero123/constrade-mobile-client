import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function CommunityItem({ details }) {
  const { width, height } = useWindowDimensions();
  const { user } = useGetCurrentUser();

  const VisibilityPrivate = () => {
    return (
      <View className="flex-row items-center">
        <Entypo name="lock" size={20} color="silver" />
        <Text className="ml-2 capitalize text-[#8193A3]">
          {details.visibility} group
        </Text>
      </View>
    );
  };

  const VisibilityPublic = () => {
    return (
      <View className="flex-row items-center">
        <MaterialIcons name="public" size={20} color="gray" />
        <Text className="ml-2 capitalize text-[#8193A3]">
          {details.visibility} group
        </Text>
      </View>
    );
  };

  return (
    <View
      className="w-full bg-white rounded-xl shadow-2xl mt-5"
      style={{ height: height * 0.3 }}
    >
      <Image
        source={{ uri: details.imageUrl }}
        style={{
          height: height * 0.1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View className="py-2 px-3">
        <Text className="font-semibold text-lg mb-3">{details.name}</Text>
        {details.visibility === "private" ? (
          <VisibilityPrivate />
        ) : (
          <VisibilityPublic />
        )}
        <View className="flex-row items-center mt-3">
          <Feather name="users" size={20} color="gray" />
          <Text className="ml-2 text-[#8193A3]">
            You{" "}
            {details.totalMembers > 1 ? (
              <Text>and {details.totalMembers} other members</Text>
            ) : (
              <Text>only</Text>
            )}
          </Text>
        </View>
        <View className="mt-6 flex-row items-center">
          <Image
            source={{ uri: user.imageUrl }}
            style={{
              width: width * 0.06,
              height: height * 0.03,
              borderRadius: 100,
            }}
          />
          {details.ownerUserId === user.userId && (
            <Text className="ml-1">
              {" "}
              <Text className="text-gray-300">by</Text> You
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
