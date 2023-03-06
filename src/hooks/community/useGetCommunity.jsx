import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityById } from "../../../redux/actions/communityAction";

export default function useGetCommunity(id) {
  const dispatch = useDispatch();

  const { data, loading } = useSelector(
    (state) => state.getCommunityByIdReducer
  );

  useEffect(() => {
    if (id === undefined) return;

    dispatch(getCommunityById(id));
  }, [id]);

  return [data];
}
