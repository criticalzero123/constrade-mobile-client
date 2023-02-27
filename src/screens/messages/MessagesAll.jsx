import { StyleSheet, View } from "react-native";
import React from "react";

import useGetChatList from "../../hooks/Message/useGetChatList";
import { ActivityIndicator } from "react-native-paper";
import ChatInfoItem from "../../components/messages/ChatInfoItem";

export default function MessagesAll96() {
  const [chats] = useGetChatList();

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
        chats.map((chat) => <ChatInfoItem info={chat} key={chat.userChatId} />)
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
