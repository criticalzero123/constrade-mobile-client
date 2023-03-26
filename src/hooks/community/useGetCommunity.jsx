import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  communityDataInfo,
  getCommunityById,
} from "../../../redux/actions/communityAction";

export default function useGetCommunity(id) {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState();
  const { data } = useSelector((state) => state.getCommunityByIdReducer);
  const communityInfo = useSelector((state) => state.communityData);

  useEffect(() => {
    if (id === undefined) return;

    dispatch(getCommunityById(id));
  }, [id]);

  useEffect(() => {
    if (data === undefined) return;

    setVisibility(data.community.visibility);

    // Getting if member
    const currentMember = data.members.find((_m) => _m.userId === user.userId);
    dispatch(communityDataInfo(data.community.communityId, currentMember));
  }, []);

  return {
    data,
    visibility,
    currentMember: communityInfo.memberInfo,
    id: communityInfo.id,
  };
}
