import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityById } from "../../../redux/actions/communityAction";

export default function useGetCommunity(id) {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState();
  const { data } = useSelector((state) => state.getCommunityByIdReducer);

  useEffect(() => {
    if (id === undefined) return;

    dispatch(getCommunityById(id));
  }, [id]);

  useEffect(() => {
    if (data === undefined) return;

    setVisibility(data.community.visibility);
  }, [data]);

  return { data, visibility };
}
