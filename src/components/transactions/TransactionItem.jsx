import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function TransactionItem({ data, currentUserId }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const getName = (id, userName) => {
    return id === currentUserId ? "Me" : userName;
  };

  return (
    <Pressable
      className="px-4 py-2 flex-row items-center bg-gray-200 shadow-2xl mb-3"
      style={{ borderRadius: 10 }}
      onPress={() => {
        if (data.preferTrade === "cash") {
          navigation.navigate("TransactionDetails", { id: data.productId });
        } else {
          ToastAndroid.show("Not a cash transaction.", ToastAndroid.SHORT);
        }
      }}
    >
      <View className="mr-2">
        <Image
          style={{
            width: width * 0.1,
            height: height * 0.05,
            borderRadius: 5,
          }}
          source={{ uri: data.productImage }}
        />
      </View>
      <View>
        <Text
          numberOfLines={1}
          className="text-[#CC481F] font-semibold text-base"
        >
          {data.productName}
        </Text>
        <Text numberOfLines={1} className="text-gray-500">
          Buyer: {getName(data.buyerId, data.buyerName)}
        </Text>
        <Text numberOfLines={1} className="text-gray-500">
          Seller: {getName(data.sellerId, data.sellerName)}
        </Text>
      </View>
      <View className="items-end flex-1 h-full">
        <Text className="text-gray-500">
          {new Date(data.transactionDate).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
