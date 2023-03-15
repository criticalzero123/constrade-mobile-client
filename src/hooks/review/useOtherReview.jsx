import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOtherReviewsUser } from "../../../redux/actions/reviewAction";

export default function useOtherReview(userId, currentUserId) {
  const dispatch = useDispatch();
  const { data: otherReview } = useSelector(
    (state) => state.getOtherReviewsUserReducer
  );

  useEffect(() => {
    if (userId === undefined || currentUserId === undefined) return;

    dispatch(getOtherReviewsUser(userId, currentUserId));
  }, [userId, currentUserId]);

  return [otherReview];
}
