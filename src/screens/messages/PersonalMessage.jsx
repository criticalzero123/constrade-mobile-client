import {
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
import usePersonalMessages from "../../hooks/Message/usePersonalMessages";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import OtherMessageItem from "../../components/messages/OtherMessageItem";
import MessageItem from "../../components/messages/MessageItem";
import { useRef } from "react";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";

export default function PersonalMessage({ route }) {
  useHideBottomTab();
  const otherUser = route.params.user;
  const otherUserName = route.params.name;

  const [index, setIndex] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(true);
  const [onDelete, setOnDelete] = useState(false);
  const { height } = useWindowDimensions();
  const { user } = useGetCurrentUser();
  const { sendMessage, message } = useMessageHubConnection();
  const [messageData, getMoreMessage, deleteMessage] = usePersonalMessages(
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
    const reverseArray = [...messageData].reverse();
    if (onDelete) {
      setMessageList([...reverseArray]);
      setOnDelete(false);
      return;
    }

    if (firstFetch) {
      setMessageList([...messageList, ...reverseArray]);
      setFirstFetch(false);
      onClickScrollDown();
    } else {
      setMessageList([...reverseArray, ...messageList]);
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
    <ContainerSafeView horizontalSpace={false}>
      {user !== undefined && (
        <>
          <View style={{ height: height * 0.9, paddingHorizontal: 20 }}>
            <View />
            <ChatHeader data={otherUser} name={otherUserName} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="mb-4"
              ref={scrollDown}
              onContentSizeChange={onClickScrollDown}
            >
              {messageData && messageData.length === 20 && (
                <Pressable onPress={onPress} className="w-full">
                  <Text className="text-center">See more</Text>
                </Pressable>
              )}

              {messageList.length !== 0 &&
                messageList.map((message) => {
                  return message.senderId === user.userId ? (
                    <MessageItem
                      key={message.userMessageId}
                      message={message.message}
                      onDelete={() => {
                        deleteMessage(message.userMessageId);
                        setOnDelete(true);
                      }}
                    />
                  ) : (
                    <OtherMessageItem
                      key={message.userMessageId}
                      image={otherUser.imageUrl}
                      message={message.message}
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
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
