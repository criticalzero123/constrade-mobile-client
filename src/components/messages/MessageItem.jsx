import {
  Alert,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

export default function MessageItem({ message, onDelete }) {
  const { width } = useWindowDimensions();

  const onPressDelete = () => {
    Alert.alert(
      "ALERT",
      "Do you want to delete this message??",
      [
        {
          text: "Yes",
          onPress: () => {
            onDelete();
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
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
