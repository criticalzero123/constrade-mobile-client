import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function NotificationItem({ item }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const handlePress = () => {
    switch (item.notificationType) {
      case "follow":
      case "review":
        navigation.navigate("Menu", {
          screen: "User",
          params: { screen: "OtherUserProfile", params: { userId: item.toId } },
        });
        break;

      case "transaction":
        navigation.navigate("TransactionDetails", {
          id: parseInt(item.toId),
        });

        break;

      case "post":
        navigation.navigate("ProductDetails", {
          productId: parseInt(item.toId),
        });
        break;

      default:
        console.log(item.notificationType);
        break;
    }
  };

  return (
    <Pressable className="flex-row items-center mb-4" onPress={handlePress}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({});
