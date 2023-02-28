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

export default function ChatInfoItem({ info }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex-rowjustify-between"
      onPress={() =>
        navigation.reset({
          routes: [{ name: "PersonalMessage", params: { user: info.user } }],
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
            <Text className="" numberOfLines={1}>
              {info.lastMessage}
            </Text>
          </View>
          <Text
            className="text-gray-500 text-center "
            style={{ width: width * 0.2 }}
          >
            {getTimeOnly(info.lastMessageDate)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
