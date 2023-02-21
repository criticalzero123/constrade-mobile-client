import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowAndFollowersUser } from "../../redux/actions/followActions";

export default function useUserFollowAndFollowers(userId) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.getFollowAndFollowersUserReducer
  );

  useEffect(() => {
    dispatch(getFollowAndFollowersUser(userId));
  }, [userId]);

  return [(follow = data), loading];
}
