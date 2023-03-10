import {
  Alert,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

export default function MessageItem({ message, onDelete, isProduct = false }) {
  const { width, height } = useWindowDimensions();

  const onPressDelete = () => {
    Alert.alert(
      "ALERT",
      "Do you want to delete this message??",
      [
        {
          text: "Yes",
          onPress: () => {
            Alert.alert("Info", "Deleted.");
            if (!isProduct) onDelete(message.userMessageId);
            else onDelete(message.productMessageId);
            return;
          },
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          return;
        },
      }
    );
  };

  return (
    <View
      className="justify-items-end items-end my-1"
      style={{ marginLeft: width * 0.1 }}
    >
      <Text
        className="rounded-b-lg rounded-l-lg px-4 py-2 bg-[#D14519] text-white"
        onLongPress={onPressDelete}
      >
        {message.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
