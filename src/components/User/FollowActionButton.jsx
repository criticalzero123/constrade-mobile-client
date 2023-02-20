import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";

import { Feather } from "@expo/vector-icons";

export default function FollowActionButton() {
  const [userFollow, setUserFollow] = useState(false);

  const FollowButton = () => {
    return (
      <View className="py-4 rounded-lg  bg-[#F76363] w-1/2 justify-center flex-row items-center">
        <Feather name="user-plus" size={24} color="white" />
        <Text className="text-white font-semibold text-base ml-2">Follow</Text>
      </View>
    );
  };

  const FollowingButton = () => {
    return (
      <View className="py-4 rounded-lg  border border-[#F76363] w-1/2 justify-center flex-row items-center">
        <Feather name="user-check" size={24} color="#F76363" />
        <Text className="text-[#F76363] font-semibold text-base ml-2">
          Following
        </Text>
      </View>
    );
  };

  return <>{userFollow ? <FollowingButton /> : <FollowButton />}</>;
}

const styles = StyleSheet.create({});
