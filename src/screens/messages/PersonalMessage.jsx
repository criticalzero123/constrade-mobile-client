import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import ChatHeader from "../../components/messages/ChatHeader";
import UserChatInput from "../../components/messages/UserChatInput";
import useChatHubConnection from "../../hooks/Message/useChatHubConnection";
import { useState } from "react";
import { useEffect } from "react";

export default function PersonalMessage({ route }) {
  const { user } = route.params;
  const { height } = useWindowDimensions();
  const [messageList, setMessageList] = useState([]);
  const [sendMessage, message] = useChatHubConnection();

  useEffect(() => {
    if (message === undefined) return;
    setMessageList([...messageList, message]);
  }, [message]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={true}
      style={styles.container}
    >
      <View className="mt-2" />
      <ChatHeader data={user} />
      <View style={{ height: height * 0.88 }}>
        <Text>PersonalMessage</Text>
        <UserChatInput sendMessage={sendMessage} receiver={user} re />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
});
