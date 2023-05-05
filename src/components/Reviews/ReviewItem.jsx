import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { getStar } from "../../../service/reviewService";
import { useNavigation } from "@react-navigation/native";

export default function ReviewItem({ review, to = false }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex-row my-4 bg-gray-200 p-4 "
      style={{ borderRadius: 10 }}
      onPress={() =>
        navigation.navigate("TransactionDetails", { id: review.productId })
      }
    >
      <View className="mr-3">
        <Image
          style={{
            width: width * 0.1,
            height: height * 0.05,
            borderRadius: 1000,
          }}
          source={{ uri: review.imageUrl }}
        />
      </View>
      <View>
        <Text className="mb-4">{getStar(review.rate)}</Text>
        {to ? (
          <Text className="text-gray-500 mb-2">
            to{" "}
            <Text className="text-black font-semibold">{review.userName}</Text>
          </Text>
        ) : (
          <Text className="text-gray-500 mb-2">
            from{" "}
            <Text className="text-black font-semibold">{review.userName}</Text>
          </Text>
        )}
        <Text className="mb-2 text-gray-500">{review.description}</Text>
        <Text className="text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
