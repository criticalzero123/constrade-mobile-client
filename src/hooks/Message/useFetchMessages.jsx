import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByUserIds } from "../../../redux/actions/userMessageAction";

export default function useFetchMessages(userId1, userId2, index) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.getMessagesByUserIdsReducer);

  useEffect(() => {
    dispatch(getMessagesByUserIds(userId1, userId2, index));
  }, []);

  const getMoreMessage = (indexNumber) => {
    dispatch(getMessagesByUserIds(userId1, userId2, indexNumber));
  };

  return [(messageData = data), getMoreMessage];
}
