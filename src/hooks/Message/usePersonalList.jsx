import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatByUserId } from "../../../redux/actions/userMessageAction";
import useGetCurrentUser from "../useGetCurrentUser";

export default function usePersonalList() {
  const { user } = useGetCurrentUser();
  const { data } = useSelector((state) => state.getChatByUserIdReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user === undefined || user === null) return;

    // Get the personal chat
    dispatch(getChatByUserId(user.userId));
  }, []);

  return [data];
}
