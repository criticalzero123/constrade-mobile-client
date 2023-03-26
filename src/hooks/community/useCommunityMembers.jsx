import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunityMembers,
  removeCommunityMemberById,
} from "../../../redux/actions/communityAction";

export default function useCommunityMembers(communityId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getCommunityMembersReducer);

  useEffect(() => {
    if (communityId === undefined) return;

    dispatch(getCommunityMembers(communityId));
  }, [communityId]);

  const removeMember = (memberId) => {
    dispatch(removeCommunityMemberById(communityId, memberId));
  };

  return [data, removeMember];
}
