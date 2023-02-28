import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import ChatHeader from "../../components/messages/ChatHeader";
import UserChatInput from "../../components/messages/UserChatInput";
import useMessageHubConnection from "../../hooks/Message/useMessageHubConnection";
import { useState } from "react";
import { useEffect } from "react";
import useFetchMessages from "../../hooks/Message/useFetchMessages";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import OtherMessageItem from "../../components/messages/OtherMessageItem";
import MessageItem from "../../components/messages/MessageItem";
import { useRef } from "react";

export default function PersonalMessage({ route }) {
  const otherUser = route.params.user;

  const [index, setIndex] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(true);

  const { height } = useWindowDimensions();
  const { user } = useGetCurrentUser();
  const { sendMessage, message } = useMessageHubConnection();
  const [messageData, getMoreMessage] = useFetchMessages(
    otherUser.userId,
    user.userId,
    index
  );

  const scrollDown = useRef(null);

  const onClickScrollDown = () => {
    scrollDown.current.scrollToEnd({ animated: true });
  };

  //for fetching in database
  useEffect(() => {
    if (messageData === undefined) return;

    if (firstFetch) {
      const reverseArray = [...messageData].reverse();
      setMessageList([...messageList, ...reverseArray]);
      setFirstFetch(false);
      onClickScrollDown();
    } else {
      setMessageList([...messageData, ...messageList]);
    }
  }, [messageData]);

  // This if for listening the message from hub
  useEffect(() => {
    if (message === undefined) return;
    setMessageList([...messageList, message]);
    onClickScrollDown();
  }, [message]);

  const onPress = () => {
    setIndex((prevIndex) => {
      getMoreMessage(index + 1);
      return prevIndex + 1;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={true}
      style={styles.container}
    >
      {user !== undefined && (
        <>
          <View className="mt-2" />
          <View style={{ height: height * 0.85, paddingHorizontal: 20 }}>
            <ChatHeader data={otherUser} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="mb-4"
              ref={scrollDown}
              onContentSizeChange={firstFetch ? onClickScrollDown : null}
            >
              <Pressable onPress={onPress}>
                <Text>See more</Text>
              </Pressable>
              {messageList.length !== 0 &&
                messageList.map((message, index) => {
                  return message.senderId === user.userId ? (
                    <MessageItem
                      key={message.userMessageId}
                      message={message.message}
                    />
                  ) : (
                    <OtherMessageItem
                      image={otherUser.imageUrl}
                      message={message.message}
                      key={message.userMessageId}
                    />
                  );
                })}
            </ScrollView>
          </View>
          <UserChatInput
            sendMessage={sendMessage}
            receiver={otherUser}
            user={user}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
