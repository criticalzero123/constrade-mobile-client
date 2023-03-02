import {
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

export default function ChatHeader({ data, product }) {
  const [isTyping, setIsTyping] = useState(false);
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  useEffect(() => {
    return () => {
      dispatch({ type: "GET_MESSAGES_BY_USER_IDS_LEAVE" });
    };
  }, []);

  const onBack = () => {
    navigation.reset({ routes: [{ name: "MessageHome" }] });
  };

  return (
    <View>
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-row items-center">
          <Pressable onPress={onBack}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </Pressable>
          <Image
            source={{ uri: data.imageUrl === "" ? image : data.imageUrl }}
            className="h-7 w-7 rounded-full ml-4"
            style={{ resizeMode: "contain" }}
          />
          <View className="ml-2">
            <Text className="font-semibold">{data.email}</Text>
            <Text
              className={`${isTyping ? "text-gray-500" : "text-[#CC481F]"}`}
            >
              {isTyping ? "typing..." : "active now"}
            </Text>
          </View>
        </View>
        <Entypo name="dots-three-horizontal" size={20} color="black" />
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
    </View>
  );
}

const styles = StyleSheet.create({});
