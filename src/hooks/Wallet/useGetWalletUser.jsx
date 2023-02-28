import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletUser } from "../../../redux/actions/walletActions";

export default function useGetWalletUser(userId) {
  const { data, loading, error } = useSelector(
    (state) => state.getWalletUserReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId === undefined) return;

    dispatch(getWalletUser(userId));
  }, [userId]);

  return { data, loading, error };
}
