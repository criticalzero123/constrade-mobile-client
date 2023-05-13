import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import BottomModal from "../modal/BottomModal";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import useSoldProduct from "../../hooks/transaction/useSoldProduct";
export default function ChatHeader({ data, product, name }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { height, width } = useWindowDimensions();

  const { user } = useGetCurrentUser();
  const { markAsSoldProduct } = useSoldProduct();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: "GET_MESSAGES_BY_USER_IDS_LEAVE" });
    };
  }, []);

  const onBack = () => {
    navigation.reset({ routes: [{ name: "MessageHome" }] });
  };

  const onPressTransacted = () => {
    Alert.alert(
      "ALERT",
      "Do you want to mark as completed?",
      [
        {
          text: "Yes",
          onPress: async () => {
            const info = {
              productId: product.productId,
              buyerUserId: data.userId,
              sellerUserId: user.userId,
            };
            const flag = await markAsSoldProduct(info);

            if (flag == -1) return;
            if (flag == -2) {
              alert("Buyer has no money in wallet");
              return;
            }
            if (product.preferTrade === "cash") {
              navigation.navigate("TransactionDetails", {
                id: product.productId,
              });
            } else {
              navigation.navigate("ProductDetails", {
                productId: product.productId,
              });
            }
          },
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => {
            setModalVisible(!modalVisible);
            return;
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          );
          return;
        },
      }
    );
  };

  return (
    <View>
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-row items-center">
          <Pressable onPress={onBack}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </Pressable>
          <Image
            source={{ uri: data.imageUrl }}
            className="h-7 w-7 rounded-full ml-4"
            style={{ resizeMode: "contain" }}
          />
          <View className="ml-2">
            <Text className="font-semibold capitalize">{name}</Text>
            <Text className="text-sm text-gray-400">{data.email}</Text>
            {/* <Text
              className={`${isTyping ? "text-gray-500" : "text-[#CC481F]"}`}
            >
              {isTyping ? "typing..." : "active now"}
            </Text> */}
          </View>
        </View>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Entypo name="dots-three-horizontal" size={20} color="black" />
        </Pressable>
      </View>
      {product && (
        <View
          className="w-full p-1 bg-gray-200 flex-row justify-between items-center"
          style={{ height: height * 0.06 }}
        >
          <View className="flex-row items-center">
            <Image
              source={{ uri: product.thumbnailUrl }}
              style={{
                height: height * 0.05,
                width: width * 0.05,
                resizeMode: "contain",
              }}
            />
            <Text className="font-semibold ml-2">{product.title}</Text>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate("ProductDetails", {
                productId: product.productId,
              })
            }
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
      <BottomModal setIsVisible={setModalVisible} isVisible={modalVisible}>
        {product && product.posterUserId !== user.userId && (
          <View>
            <View className="flex-row items-center">
              <FontAwesome5 name="flag" size={20} color="red" />
              <Text className="text-red-500 ml-2">Report user</Text>
            </View>
            <View className="my-4" />
          </View>
        )}

        {product &&
          product.productStatus !== "sold" &&
          product.posterUserId === user.userId && (
            <View>
              <Pressable
                className="flex-row items-center"
                onPress={onPressTransacted}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="green"
                />
                <Text className="text-green-500 ml-2">
                  Mark as transacted to this person
                </Text>
              </Pressable>
              <View className="my-4" />
            </View>
          )}
        <Pressable
          className="flex-row items-center"
          onPress={() => {
            setModalVisible(!modalVisible);
            navigation.navigate("User", {
              screen: "OtherUserProfile",
              params: {
                userId: data.userId,
              },
            });
          }}
        >
          <FontAwesome name="user-circle-o" size={20} color="gray" />
          <Text className="text-gray-500 ml-2">View profile</Text>
        </Pressable>
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({});
