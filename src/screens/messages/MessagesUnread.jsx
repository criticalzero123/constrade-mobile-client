import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MessageEmpty from "../../components/messages/MessageEmpty";

export default function MessagesUnread() {
  return (
    <View
      className="mt-4 flex-row justify-between items-center"
      style={{ paddingHorizontal: 20 }}
    >
      <MessageEmpty
        title="You're all catched up"
        description="Sheesh. No more missed messages, for now."
      />
    </View>
  );
}

const styles = StyleSheet.create({});
