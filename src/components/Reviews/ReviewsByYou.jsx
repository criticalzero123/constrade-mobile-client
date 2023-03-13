import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useReview from "../../hooks/review/useReview";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function ReviewsByYou({ route }) {
  const { user } = useGetCurrentUser();
  const { otherUserId } = route.params;
  const [notReviewed] = useReview(otherUserId, user.userId);

  return (
    <View>
      {notReviewed && notReviewed.length !== 0 && (
        <View>
          <Text>Available To Review</Text>
          {notReviewed.map((_r) => (
            <View>
              <Text className="p-4 border border-red-400">
                Click Here to review!
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
