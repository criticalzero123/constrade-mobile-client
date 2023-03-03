import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowAndFollowersUser,
  isFollowUser,
} from "../../redux/actions/followActions";

export default function useFollowAction(otherUserId, currentUserId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.isFollowUserReducer);
  const { loading, success } = useSelector((state) => state.followUserReducer);

  useEffect(() => {
    dispatch(isFollowUser(otherUserId, currentUserId));
    dispatch(getFollowAndFollowersUser(otherUserId));
  }, [otherUserId, currentUserId]);

  const followAction = () => {
    dispatch(followUser(otherUserId, currentUserId));
  };

  return { followAction, isFollow: data, loading, success };
}
