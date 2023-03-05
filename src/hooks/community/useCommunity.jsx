import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCommunity,
  createCommunity,
  getMyCommunity,
} from "../../../redux/actions/communityAction";

export default function useCommunity(userId) {
  const dispatch = useDispatch();
  const { data: created } = useSelector(
    (state) => state.createCommunityReducer
  );
  const { data: communityList } = useSelector(
    (state) => state.getMyCommunityReducer
  );

  //   Getting if success creating community
  useEffect(() => {
    if (created === undefined) return;

    alert(created);
  }, [created]);

  //   Getting my community
  useEffect(() => {
    if (userId === undefined) return;
    dispatch(getMyCommunity(userId));

    return () => {
      dispatch(cleanCommunity());
    };
  }, []);

  const create = (info) => {
    dispatch(createCommunity(info));
  };

  return { create, communityList };
}
