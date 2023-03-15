import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useOtherReview from "../../hooks/review/useOtherReview";

export default function ReviewsByOthers({ route }) {
  const { otherUserId, user } = route.params;
  const [otherReview] = useOtherReview(otherUserId, user.userId);

  return (
    <View>
      {otherReview && otherReview.length !== 0 && (
        <View>
          {otherReview.map((_review) => (
            <View className="flex-row">
              <Text>{_review.rate}</Text>
              <Text>{_review.description}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
