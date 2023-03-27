import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetCurrentUser from "../../useGetCurrentUser";
import { getProductChatByUserId } from "../../../../redux/actions/productMessageAction";

export default function useProductList() {
  const { user } = useGetCurrentUser();
  const { data } = useSelector((state) => state.getProductChatByUserIdReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === undefined || user === null) return;

    // Get the product chat
    dispatch(getProductChatByUserId(user.userId));
  }, []);

  return [data];
}
