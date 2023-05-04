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
import { StackActions, useNavigation } from "@react-navigation/native";

export default function useCommunity(userId) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data: communityList } = useSelector(
    (state) => state.getMyCommunityReducer
  );

  //   Getting my community
  useEffect(() => {
    if (userId === undefined) return;
    dispatch(getMyCommunity(userId));
  }, []);

  const deleteCommunityById = async (id, userId) => {
    const res = await deleteCommunity(id, userId);
    if (res) {
      alert("Successfully deleted!");
      navigation.dispatch(
        StackActions.replace("Menu", { screen: "Community" })
      );
    } else {
      alert("Something went wrong in deleting community!");
    }
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
