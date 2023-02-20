import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MessageEmpty from "../../components/messages/MessageEmpty";

export default function MessagesAll() {
  return (
    <View
      className="mt-4 flex-row justify-between items-center"
      style={{ paddingHorizontal: 20 }}
    >
      <MessageEmpty
        title="Its quiet here"
        description="Negotiations goes here and messages from someone who wants to buy from you."
      />
    </View>
  );
}

const styles = StyleSheet.create({});
