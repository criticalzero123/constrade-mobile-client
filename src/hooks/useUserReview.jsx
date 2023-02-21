import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsUser } from "../../redux/actions/reviewAction";

export default function useUserReview(userId) {
  const { review } = useSelector((state) => state.getReviewsUserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsUser(userId));
  }, [userId]);

  return [review];
}
