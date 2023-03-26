import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function MemberRequestsItem({ data, accept, reject }) {
  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-row justify-between my-2 items-center">
      <View className="flex-row">
        <Image
          style={{
            width: width * 0.1,
            height: height * 0.05,
            borderRadius: 1000,
          }}
          source={{ uri: data.userImageUrl }}
        />
        <View className="ml-2">
          <Text className="text-base font-semibold">{data.userName}</Text>
          <Text className="text-gray-500">{data.userEmail}</Text>
        </View>
      </View>
      <View className="flex-row">
        <Pressable
          className="mx-3"
          onPress={() => accept(data.communityJoinRequestId)}
        >
          <AntDesign name="checkcircle" size={25} color="green" />
        </Pressable>
        <Pressable onPress={() => reject(data.communityJoinRequestId)}>
          <AntDesign name="closecircle" size={25} color="maroon" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
