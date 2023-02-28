import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactionWalletUser } from "../../../redux/actions/walletActions";

export default function useGetAllTransactionsWallet(userId) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.getAllTransactionsWalletUserReducer
  );

  useEffect(() => {
    if (userId === undefined) return;

    dispatch(getAllTransactionWalletUser(userId));
  }, [userId]);

  return { transacs: data, loading, error };
}
