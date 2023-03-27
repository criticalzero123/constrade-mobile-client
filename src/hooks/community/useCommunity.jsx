import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommunity,
  deleteCommunity,
  editCommunity,
  getMyCommunity,
  joinCommunityById,
  reportCommunity,
} from "../../../redux/actions/communityAction";

export default function useCommunity(userId) {
  const dispatch = useDispatch();

  const { data: communityList } = useSelector(
    (state) => state.getMyCommunityReducer
  );

  //   Getting my community
  useEffect(() => {
    if (userId === undefined) return;
    dispatch(getMyCommunity(userId));
  }, []);

  const deleteCommunityById = (id, userId) => {
    dispatch(deleteCommunity(id, userId));
  };

  const reportCommunityUser = (info) => {
    dispatch(reportCommunity(info));
  };

  const create = (info) => {
    return createCommunity(info);
  };

  const join = (communityId, userId) => {
    return joinCommunityById({ communityId, userId });
  };

  const edit = (info) => {
    return editCommunity(info);
  };

  return {
    create,
    communityList,
    deleteCommunityById,
    reportCommunityUser,
    join,
    edit,
  };
}
