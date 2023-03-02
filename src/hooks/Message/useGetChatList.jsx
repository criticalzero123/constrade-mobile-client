import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatByUserId } from "../../../redux/actions/userMessageAction";
import useGetCurrentUser from "../useGetCurrentUser";
import { getProductChatByUserId } from "../../../redux/actions/productMessageAction";

export default function useGetChatList() {
  const { user } = useGetCurrentUser();
  const { data: personalChat } = useSelector(
    (state) => state.getChatByUserIdReducer
  );
  const { data: productChat } = useSelector(
    (state) => state.getProductChatByUserIdReducer
  );
  const dispatch = useDispatch();

  const combineChat =
    personalChat && productChat ? [...personalChat, ...productChat] : [];

  useEffect(() => {
    if (user === undefined || user === null) return;

    // Get the personal chat
    dispatch(getChatByUserId(user.userId));
    // Get the product chat
    dispatch(getProductChatByUserId(user.userId));
  }, [dispatch, user]);

  return [combineChat];
}
