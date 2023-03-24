import { StyleSheet, View } from "react-native";
import React from "react";
import useOtherReview from "../../hooks/review/useOtherReview";
import ReviewItem from "./ReviewItem";

export default function ReviewsByOthers({ route }) {
  const { otherUserId, user } = route.params;
  const [otherReview] = useOtherReview(otherUserId, user.userId);

  return (
    <View>
      {otherReview && otherReview.length !== 0 && (
        <View>
          {otherReview.map((_review) => (
            <ReviewItem review={_review} key={_review.reviewId} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
