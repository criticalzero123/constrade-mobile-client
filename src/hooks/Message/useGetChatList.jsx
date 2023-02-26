import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatByUserId } from "../../../redux/actions/userMessageAction";
import useGetCurrentUser from "../useGetCurrentUser";

export default function useGetChatList() {
  const { user } = useGetCurrentUser();
  const { data } = useSelector((state) => state.getChatByUserIdReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === undefined) return;

    dispatch(getChatByUserId(user.userId));
  }, [dispatch, user]);

  return [(chats = data)];
}
