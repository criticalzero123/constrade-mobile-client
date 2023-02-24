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
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function UserChatInput({ receiver, sendMessage }) {
  const [value, setValue] = useState("");
  const { width } = useWindowDimensions();
  const { user } = useGetCurrentUser();

  const onPress = () => {
    sendMessage(user.userId, receiver.userId, receiver.email, value);
    setValue("");
  };

  return (
    <View className="absolute bottom-0 flex-row items-center">
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
