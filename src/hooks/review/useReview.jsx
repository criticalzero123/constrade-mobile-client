import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotRated } from "../../../redux/actions/reviewAction";

export default function useReview(userId, currentUserId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getNotRatedReducer);

  useEffect(() => {
    if (userId === undefined || currentUserId === undefined) return;

    dispatch(getNotRated(userId, currentUserId));
  }, [userId, currentUserId]);

  return [data];
}
