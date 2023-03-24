import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowAndFollowersUser } from "../../redux/actions/followActions";

export default function useUserFollowAndFollowers(userId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.followCountReducer);

  useEffect(() => {
    if (userId === undefined) return;
    dispatch(getFollowAndFollowersUser(userId));
  }, [userId]);

  return [data];
}
