import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getTimeOnly } from "../../../service/dateService";

export default function ChatInfoItem({ info, product }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const routeTo = product
    ? {
        name: "ProductMessage",
        params: { details: { user: info.user, product: info.product } },
      }
    : { name: "PersonalMessage", params: { user: info.user } };

  return (
    <Pressable
      className={`flex-row justify-between items-center my-2 `}
      onPress={() =>
        navigation.reset({
          routes: [routeTo],
        })
      }
    >
      <View className="flex-row " style={{ width: width }}>
        <Image
          source={{ uri: info.user.imageUrl }}
          style={{ width: width * 0.1, height: height * 0.05 }}
          className="rounded-full mr-4"
        />
        <View className="flex-row ">
          <View style={{ width: width * 0.6 }}>
            <Text className="capitalize text-gray-500">
              {info.otherUserName}
            </Text>
            {product && (
              <Text className="font-semibold capitalize mb-1">
                {product.title}
              </Text>
            )}
            <Text className="" numberOfLines={1}>
              {info.lastMessage}
            </Text>
          </View>
          <View style={{ width: width * 0.2 }} className="items-center">
            <Text className="text-gray-500 text-center ">
              {getTimeOnly(info.lastMessageDate)}
            </Text>
            {product && (
              <View className="items-center p-2">
                <Image
                  source={{ uri: product.thumbnailUrl }}
                  style={{
                    width: width * 0.05,
                    height: height * 0.05,
                    resizeMode: "contain",
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
