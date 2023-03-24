import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import useMyReview from "../../hooks/review/useMyReview";
import { useNavigation } from "@react-navigation/native";
import ReviewItem from "./ReviewItem";

export default function ReviewsByYou({ route }) {
  const { otherUserId, user } = route.params;
  const [notReviewed, myRate] = useMyReview(otherUserId, user.userId);

  const navigation = useNavigation();
  return (
    <View>
      {notReviewed && notReviewed.length !== 0 && (
        <View>
          <Text className="my-3 font-semibold ">
            You have a transaction that not yet reviewed.
          </Text>
          {notReviewed.map((_review) => (
            <View>
              <Pressable
                onPress={() =>
                  navigation.navigate("AddReview", {
                    reviewerId: user.userId,
                    transactionRefId: _review.transactionId,
                  })
                }
              >
                <Text
                  className="p-4 border border-red-300 text-red-500"
                  style={{ borderRadius: 5 }}
                >
                  Click Here to review!
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {myRate && myRate.length !== 0 && (
        <View>
          {myRate.map((_review, index) => (
            <ReviewItem review={_review} key={_review.reviewId} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
