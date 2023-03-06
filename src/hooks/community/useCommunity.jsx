import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCommunity,
  createCommunity,
  deleteCommunity,
  getMyCommunity,
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

    return () => {
      dispatch(cleanCommunity());
    };
  }, []);

  const deleteCommunityById = (id, userId) => {
    dispatch(deleteCommunity(id, userId));
    alert("deleted");
  };

  const reportCommunityUser = (info) => {
    dispatch(reportCommunity(info));
    alert("reported");
  };

  const create = (info) => {
    dispatch(createCommunity(info));
  };

  return { create, communityList, deleteCommunityById, reportCommunityUser };
}
