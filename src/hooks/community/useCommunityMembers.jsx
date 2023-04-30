import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunityMembers,
  removeCommunityMemberById,
} from "../../../redux/actions/communityAction";
import { useState } from "react";

export default function useCommunityMembers(communityId) {
  const [data, setData] = useState();

  useEffect(() => {
    if (communityId === undefined) return;

    const fetch = async () => {
      const res = await getCommunityMembers(communityId);

      if (res) {
        setData(res);
      }
    };

    fetch();
  }, [communityId]);

  const removeMember = async (memberId) => {
    const res = await removeCommunityMemberById(communityId, memberId);

    if (res) {
      const newMembers = data.filter(
        (m) => m.member.communityMemberId !== memberId
      );
      setData(newMembers);
      alert("Member Removed Successfully!");
    }
  };

  return [data, removeMember];
}
