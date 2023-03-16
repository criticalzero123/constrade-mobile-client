import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductTransaction } from "../../../redux/actions/transactionAction";

export default function useTransaction(id) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getProductTransactionReducer);

  useEffect(() => {
    if (id === undefined) return;

    dispatch(getProductTransaction(id));
  }, [id]);

  return [data];
}
