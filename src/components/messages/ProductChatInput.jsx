import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import useSoldProduct from "../../hooks/Transaction/useSoldProduct";

export default function ProductChatInput({
  details,
  currentUser,
  sendMessage,
}) {
  const { height, width } = useWindowDimensions();
  const [value, setValue] = useState();

  const { markAsSoldProduct } = useSoldProduct();

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

  const onPressCompleted = () => {
    Alert.alert(
      "ALERT",
      "Do you want to mark as completed?",
      [
        {
          text: "Yes",
          onPress: () => {
            Alert.alert("Info", "Transaction Process.");
            const info = {
              productId: details.product.productId,
              buyerUserId: details.user.userId,
              sellerUserId: currentUser.userId,
            };
            markAsSoldProduct(info);
            return;
          },
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => {
            Alert.alert("Cancel Pressed");
            return;
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          );
          return;
        },
      }
    );
  };

  return (
    <View
      className=" flex-row items-center justify-center bg-white"
      style={{ width: width, height: height * 0.1 }}
    >
      {details.product.posterUserId == currentUser.userId && (
        <Pressable className="mr-2" onPress={onPressCompleted}>
          <SimpleLineIcons name="options-vertical" size={18} color="black" />
        </Pressable>
      )}
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
