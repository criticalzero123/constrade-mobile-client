import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

export default function NotificationItem({ item }) {
  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-row items-center mb-4">
      {item.imageUrl.toString().trim() !== "" && (
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            resizeMode: "contain",
            width: width * 0.1,
            height: height * 0.05,
          }}
          className="rounded-full"
        />
      )}
      <View className="ml-4">
        <Text className="text-[#011B33] font-semibold text-base">
          {item.notificationMessage}
        </Text>
        <Text className="text-[#627282] mt-1">
          {new Date(item.notificationDate).toLocaleDateString()}{" "}
          {new Date(item.notificationDate).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
