import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularCommunity } from "../../../redux/actions/communityAction";

export default function usePopularCommunity(id) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getPopularCommunityReducer);
  useEffect(() => {
    if (id === undefined) return;

    dispatch(getPopularCommunity(id));
  }, [id]);

  return [data];
}
