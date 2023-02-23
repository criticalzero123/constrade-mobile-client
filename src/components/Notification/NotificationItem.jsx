import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

export default function NotificationItem() {
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-row items-center">
      <Image
        source={{ uri: image }}
        style={{
          resizeMode: "contain",
          width: width * 0.1,
          height: height * 0.05,
        }}
        className="rounded-full"
      />
      <View className="ml-4">
        <Text className="text-[#011B33] font-semibold text-base">
          Mike started following you.
        </Text>
        <Text className="text-[#627282] mt-1">NotificationItem</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
