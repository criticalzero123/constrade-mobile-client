import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function ChatHeader({ data }) {
  const [isTyping, setIsTyping] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  useEffect(() => {
    return () => {
      dispatch({ type: "GET_MESSAGES_BY_USER_IDS_LEAVE" });
    };
  }, []);

  const onBack = () => {
    navigation.reset({ routes: [{ name: "MessageHome" }] });
  };

  return (
    <View className="flex-row items-center justify-between w-full">
      <View className="flex-row items-center">
        <Pressable onPress={onBack}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </Pressable>
        <Image
          source={{ uri: data.imageUrl === "" ? image : data.imageUrl }}
          className="h-7 w-7 rounded-full ml-4"
          style={{ resizeMode: "contain" }}
        />
        <View className="ml-2">
          <Text className="font-semibold">{data.email}</Text>
          <Text className={`${isTyping ? "text-gray-500" : "text-[#CC481F]"}`}>
            {isTyping ? "typing..." : "active now"}
          </Text>
        </View>
      </View>
      <Entypo name="dots-three-horizontal" size={20} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({});
