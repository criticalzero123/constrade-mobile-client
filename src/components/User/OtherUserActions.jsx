import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FollowActionButton from "./FollowActionButton";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OtherUserActions({ otherUser, currentUserId }) {
  const navigation = useNavigation();

  return (
    <View className="flex-row w-full justify-between items-center mt-4">
      <FollowActionButton
        otherUserId={otherUser.userId}
        currentUserId={currentUserId}
      />

      <View className="px-7 py-5 w-1/2 flex-row items-center justify-center">
        <Ionicons name="md-chatbubbles-outline" size={24} color="#FF6838" />
        <Pressable
          onPress={() =>
            navigation.navigate("Message", {
              screen: "PersonalMessage",
              params: {
                user: otherUser,
              },
            })
          }
        >
          <Text className="text-[#FF6838] ml-2">Send message</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
