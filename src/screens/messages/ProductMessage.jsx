import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import ChatHeader from "../../components/messages/ChatHeader";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import ProductChatInput from "../../components/messages/ProductChatInput";
import useProductMessageHub from "../../hooks/Message/ProductMessage/useProductMessageHub";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";
import useProductMessages from "../../hooks/Message/ProductMessage/useProductMessages";
import { useState } from "react";
import { useEffect } from "react";
import MessageItem from "../../components/messages/MessageItem";
import OtherMessageItem from "../../components/messages/OtherMessageItem";

export default function ProductMessage({ route }) {
  useHideBottomTab();
  const { details } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(true);

  const { height, width } = useWindowDimensions();
  const { user: currentUser } = useGetCurrentUser();
  const [messageData, getMoreMessage, deleteMessage] = useProductMessages(
    currentUser.userId,
    details.user.userId,
    details.product.productId,
    currentIndex
  );

  const { sendMessage, message } = useProductMessageHub();

  //for fetching in database
  useEffect(() => {
    if (messageData === undefined) return;

    if (firstFetch) {
      const reverseArray = [...messageData].reverse();
      setMessageList([...messageList, ...reverseArray]);
      setFirstFetch(false);
    } else {
      setMessageList([...messageData, ...messageList]);
    }
  }, [messageData]);

  // This if for listening the message from hub
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
      {user !== undefined && (
        <>
          <View style={{ height: height * 0.9, paddingHorizontal: 20 }}>
            <ChatHeader data={details.user} product={details.product} />
            <ScrollView showsHorizontalScrollIndicator={false} className="mb-4">
              <Pressable className="w-full">
                <Text className="text-center">See more</Text>
              </Pressable>
              {messageList.length !== 0 &&
                messageList.map((message, index) => {
                  return message.senderId === user.userId ? (
                    <MessageItem
                      key={message.userMessageId}
                      message={message.message}
                      onDelete={deleteMessage}
                      isProduct={true}
                    />
                  ) : (
                    <OtherMessageItem
                      image={details.user.imageUrl}
                      message={message.message}
                      key={message.userMessageId}
                    />
                  );
                })}
            </ScrollView>
          </View>
          <ProductChatInput
            details={details}
            currentUser={currentUser}
            sendMessage={sendMessage}
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
