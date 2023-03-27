import { StyleSheet, View } from "react-native";
import React from "react";

import usePersonalList from "../../hooks/Message/usePersonalList";
import { ActivityIndicator } from "react-native-paper";
import ChatInfoItem from "../../components/messages/ChatInfoItem";
import MessageEmpty from "../../components/messages/MessageEmpty";

export default function MessagesListPersonal() {
  const [chats] = usePersonalList();

  return (
    <View className="mt-4" style={{ paddingHorizontal: 20 }}>
      {chats === undefined ? (
        <View className=" flex-row justify-center items-center h-full">
          <ActivityIndicator size="large" />
        </View>
      ) : chats.length === 0 ? (
        <MessageEmpty
          title="Its quiet here"
          description="Negotiations goes here and messages from someone who wants to buy from you."
        />
      ) : (
        chats.map((chat, index) => (
          <ChatInfoItem info={chat} key={index} product={chat.product} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
