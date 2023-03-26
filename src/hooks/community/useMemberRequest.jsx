import { useEffect } from "react";
import { useState } from "react";
import {
  acceptMemberRequest,
  getMemberRequests,
  rejectMemberRequest,
} from "../../../redux/actions/communityAction";

export default function useMemberRequest(communityId) {
  const [members, setMembers] = useState();

  useEffect(() => {
    if (communityId === undefined) return;

    const fetch = async () => {
      const res = await getMemberRequests(communityId);
      setMembers(res);
    };

    fetch();
  }, [communityId]);

  const accept = async (reqId) => {
    const res = await acceptMemberRequest(communityId, reqId);

    if (res) {
      const newMemberList = members.filter(
        (_m) => _m.communityJoinRequestId !== reqId
      );

      setMembers(newMemberList);
    } else {
      alert("Something went wrong in accepting member");
    }
  };

  const reject = async (reqId) => {
    const res = await rejectMemberRequest(communityId, reqId);

    if (res) {
      const newMemberList = members.filter(
        (_m) => _m.communityJoinRequestId !== reqId
      );

      setMembers(newMemberList);
    } else {
      alert("Something went wrong in rejecting member");
    }
  };

  return [members, accept, reject];
}
