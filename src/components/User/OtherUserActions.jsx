import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FollowActionButton from "./FollowActionButton";

import { Ionicons } from "@expo/vector-icons";

export default function OtherUserActions({ otherUserId, currentUserId }) {
  return (
    <View className="flex-row w-full justify-between items-center mt-4">
      <FollowActionButton
        otherUserId={otherUserId}
        currentUserId={currentUserId}
      />
      <View className="px-7 py-5 w-1/2 flex-row items-center justify-center">
        <Ionicons name="md-chatbubbles-outline" size={24} color="#FF6838" />
        <Text className="text-[#FF6838] ml-2">Send message</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
