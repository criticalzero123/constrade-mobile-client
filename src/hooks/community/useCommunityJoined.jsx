import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyCommunityJoined } from "../../../redux/actions/communityAction";

export default function useCommunityJoined(id) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllMyCommunityJoinedReducer);
  useEffect(() => {
    if (id === undefined) return;

    dispatch(getAllMyCommunityJoined(id));
  }, []);

  return [data];
}
