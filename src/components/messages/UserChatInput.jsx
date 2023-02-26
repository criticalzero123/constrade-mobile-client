import {
  StyleSheet,
  View,
  TextInput,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function UserChatInput({ receiver, sendMessage, user }) {
  const [value, setValue] = useState("");
  const { width, height } = useWindowDimensions();

  const onPress = () => {
    if (value.toString().trim() === "") return;

    sendMessage(user.userId, receiver.userId, value);
    setValue("");
  };

  return (
    <View
      className=" flex-row items-center justify-center bg-white"
      style={{ width: width, height: height * 0.08 }}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        className="bg-gray-200 py-2 px-4 rounded-full mr-3"
        style={{ width: width * 0.8 }}
        placeholder="Write your message..."
      />
      <Pressable onPress={onPress}>
        <Feather name="send" size={24} color="gray" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
