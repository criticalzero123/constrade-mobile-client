import { useWindowDimensions, View, TextInput, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function ProductChatInput({
  details,
  currentUser,
  sendMessage,
}) {
  const { height, width } = useWindowDimensions();
  const [value, setValue] = useState();

  const onPress = () => {
    if (value.trim() === "") return;
    sendMessage(
      currentUser.userId,
      details.user.userId,
      details.product.productId,
      value
    );

    setValue("");
  };

  return (
    <View
      className=" flex-row items-center justify-center bg-white"
      style={{ width: width, height: height * 0.1 }}
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
