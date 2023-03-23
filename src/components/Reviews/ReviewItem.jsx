import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { getDateFull } from "../../../service/dateService";
import { getStar } from "../../../service/reviewService";

export default function ReviewItem({ review }) {
  const { width, height } = useWindowDimensions();

  return (
    <View
      className="flex-row my-4 bg-gray-200 p-4 "
      style={{ borderRadius: 10 }}
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
        <Text className="text-gray-500 mb-2">
          from{" "}
          <Text className="text-black font-semibold">{review.userName}</Text>
        </Text>
        <Text className="mb-2 text-gray-500">{review.description}</Text>
        <Text className="text-gray-500">{getDateFull(review.date)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
