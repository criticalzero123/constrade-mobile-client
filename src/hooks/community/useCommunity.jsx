import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCommunity,
  createCommunity,
  deleteCommunity,
  getMyCommunity,
  joinCommunityById,
  reportCommunity,
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

    // return () => {
    //   dispatch(cleanCommunity());
    // };
  }, []);

  const deleteCommunityById = (id, userId) => {
    dispatch(deleteCommunity(id, userId));
  };

  const reportCommunityUser = (info) => {
    dispatch(reportCommunity(info));
  };

  const create = (info) => {
    dispatch(createCommunity(info));
  };

  const join = (communityId, userId) => {
    dispatch(joinCommunityById({ communityId, userId }));
  };

  return {
    create,
    communityList,
    deleteCommunityById,
    reportCommunityUser,
    join,
  };
}
