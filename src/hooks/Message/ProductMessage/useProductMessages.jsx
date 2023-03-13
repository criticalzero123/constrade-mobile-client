import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductMessage,
  getProductMessages,
} from "../../../../redux/actions/productMessageAction";

export default function useProductMessages(userId, userId2, productId, index) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.getProductMessagesReducer);

  useEffect(() => {
    dispatch(getProductMessages(userId, userId2, productId, index));

    return () => {
      dispatch({ type: "GET_PRODUCT_MESSAGES_LEAVE" });
    };
  }, []);

  const getMoreMessage = (indexNumber) => {
    dispatch(getProductMessages(userId, userId2, productId, indexNumber));
  };

  const deleteMessage = (id) => {
    deleteProductMessage(id);
  };

  return [data, getMoreMessage, deleteMessage];
}
