import { Pressable, Text, View } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import useFollowAction from "../../hooks/useFollowAction";
import { ActivityIndicator } from "react-native-paper";

export default function FollowActionButton({ otherUserId, currentUserId }) {
  const { followAction, isFollow, loading } = useFollowAction(
    otherUserId,
    currentUserId
  );

  const onPressAction = () => {
    followAction(otherUserId, currentUserId);
  };

  const FollowButton = () => {
    return (
      <Pressable
        className="py-4 rounded-lg  bg-[#F76363] w-1/2 justify-center flex-row items-center"
        onPress={onPressAction}
      >
        <Feather name="user-plus" size={24} color="white" />
        <Text className="text-white font-semibold text-base ml-2">Follow</Text>
      </Pressable>
    );
  };

  const FollowingButton = () => {
    return (
      <Pressable
        className="py-4 rounded-lg  border border-[#F76363] w-1/2 justify-center flex-row items-center"
        onPress={onPressAction}
      >
        <Feather name="user-check" size={24} color="#F76363" />
        <Text className="text-[#F76363] font-semibold text-base ml-2">
          Following
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      {loading ? (
        <View className="w-1/2 justify-center items-center">
          <ActivityIndicator size="small" />
        </View>
      ) : isFollow ? (
        <FollowingButton />
      ) : (
        <FollowButton />
      )}
    </>
  );
}
