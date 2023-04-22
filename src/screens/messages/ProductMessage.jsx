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
  Alert,
} from "react-native";
import React, { useRef } from "react";
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
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useNavigation } from "@react-navigation/native";

export default function ProductMessage({ route }) {
  useHideBottomTab();
  const { details } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(true);
  const [onDelete, setOnDelete] = useState(false);
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const { user: currentUser } = useGetCurrentUser();
  const [messageData, getMoreMessage, deleteMessage] = useProductMessages(
    currentUser.userId,
    details.user.userId,
    details.product.productId,
    currentIndex
  );
  const { sendMessage, message } = useProductMessageHub();
  const scrollDown = useRef(null);
  const onClickScrollDown = () => {
    scrollDown.current.scrollToEnd({ animated: true });
  };

  //for fetching in database
  useEffect(() => {
    if (messageData === undefined) return;
    const reverseArray = [...messageData].reverse();

    if (onDelete) {
      setMessageList(reverseArray);
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

  // This is for the warning
  useEffect(() => {
    if (
      details.product.productStatus === "unsold" &&
      details.user.userType === "semi-verified"
    ) {
      Alert.alert(
        "Warning!",
        "This user is not verified. Please be careful who you transac with.",
        [
          {
            text: "Proceed",
            onPress: () => console.log("proceed with chat."),
          },
          {
            text: "Cancel",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    }
  }, []);

  const onPress = () => {
    setCurrentIndex((prevIndex) => {
      getMoreMessage(currentIndex + 1);
      return prevIndex + 1;
    });
  };
  return (
    <ContainerSafeView horizontalSpace={false}>
      {currentUser !== undefined && (
        <>
          <View style={{ height: height * 0.9, paddingHorizontal: 20 }}>
            <ChatHeader data={details.user} product={details.product} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="mb-4"
              ref={scrollDown}
              onContentSizeChange={onClickScrollDown}
            >
              {messageData && messageData.length === 20 && (
                <Pressable className="w-full" onPress={onPress}>
                  <Text className="text-center">See more</Text>
                </Pressable>
              )}

              {messageList.length !== 0 &&
                messageList.map((message, index) => {
                  return message.senderId === user.userId ? (
                    <MessageItem
                      key={index}
                      message={message.message}
                      onDelete={() => {
                        deleteMessage(message.productMessageId);
                        setOnDelete(true);
                      }}
                    />
                  ) : (
                    <OtherMessageItem
                      image={details.user.imageUrl}
                      message={message.message}
                      key={index}
                    />
                  );
                })}
            </ScrollView>
          </View>
          {details.product.productStatus === "sold" ? (
            <View
              style={{ width: width, height: height * 0.1 }}
              className="flex-row items-center justify-center bg-gray-300"
            >
              <View>
                <Text className="text-center font-semibold text-lg mb-2 mt-1">
                  This product is already sold.
                </Text>

                <Pressable
                  className="p-2 bg-[#CC481F]"
                  style={{ borderRadius: 5 }}
                  onPress={() =>
                    navigation.navigate("TransactionDetails", {
                      id: details.product.productId,
                    })
                  }
                >
                  <Text className="text-center text-white">
                    Go to Transaction
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <ProductChatInput
              details={details}
              currentUser={currentUser}
              sendMessage={sendMessage}
            />
          )}
        </>
      )}
    </ContainerSafeView>
  );
}
