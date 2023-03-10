import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import useMyReview from "../../hooks/review/useMyReview";
import { useNavigation } from "@react-navigation/native";

export default function ReviewsByYou({ route }) {
  const { otherUserId, user } = route.params;
  const [notReviewed, myRate] = useMyReview(otherUserId, user.userId);

  const navigation = useNavigation();
  return (
    <View>
      {notReviewed && notReviewed.length !== 0 && (
        <View>
          <Text>Available To Review</Text>
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
                <Text className="p-4 border border-red-400">
                  Click Here to review!
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {myRate && myRate.length !== 0 && (
        <View>
          {myRate.map((_review) => (
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
