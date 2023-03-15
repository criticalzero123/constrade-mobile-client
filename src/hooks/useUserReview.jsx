import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyAverageRate } from "../../redux/actions/reviewAction";

export default function useUserReview(userId) {
  const { data } = useSelector((state) => state.getMyAverageRateReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAverageRate(userId));
  }, [userId]);

  return [data];
}
