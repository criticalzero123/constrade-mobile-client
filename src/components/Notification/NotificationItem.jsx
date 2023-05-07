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
import { markAsRead } from "../../../redux/actions/notificationAction";

export default function NotificationItem({ item }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const handlePress = async () => {
    if (item.status === "unread") {
      await markAsRead(item.userNotificationId);
    }

    switch (item.notificationType) {
      case "follow":
      case "review":
        navigation.navigate("Menu", {
          screen: "User",
          params: { screen: "OtherUserProfile", params: { userId: item.toId } },
        });
        break;

      case "verification":
        navigation.navigate("Menu", {
          screen: "User",
          params: { screen: "UserProfile" },
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
        <Text
          className={`text-[#011B33]  text-base ${
            item.status === "unread" && "font-semibold"
          }`}
        >
          {item.notificationMessage}
        </Text>
        <Text className="text-[#627282] mt-1">
          {new Date(item.notificationDate).toLocaleDateString()}{" "}
          {new Date(item.notificationDate).toLocaleTimeString()} •
          <Text className="text-gray-400"> {item.status}</Text>
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
