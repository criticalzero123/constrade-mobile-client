import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReviewItem from "./ReviewItem";
import { useState } from "react";
import { useEffect } from "react";
import { getMyReviewsMadeUser } from "../../../redux/actions/reviewAction";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function ReviewsByYouMade() {
  const [myRate, setMyRate] = useState();
  const { user } = useGetCurrentUser();

  useEffect(() => {
    const fetch = async () => {
      const res = await getMyReviewsMadeUser(user.userId);

      if (res) {
        setMyRate(res);
      } else {
        alert("Getting error getting reviews you made.");
      }
    };

    fetch();
  }, []);

  return (
    <View>
      {myRate &&
        (myRate.length !== 0 ? (
          <View>
            {myRate.map((_review) => (
              <ReviewItem review={_review} key={_review.reviewId} to={true} />
            ))}
          </View>
        ) : (
          <View>
            <Text>You go no reviews made.</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({});
