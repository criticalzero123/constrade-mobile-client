import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommunity } from "../../../redux/actions/communityAction";

export default function useGetAllCommunity() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.getAllCommunityReducer);

  useEffect(() => {
    dispatch(getAllCommunity());
  }, []);

  return [data];
}
