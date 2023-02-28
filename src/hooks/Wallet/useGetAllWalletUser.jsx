import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWalletUser } from "../../../redux/actions/walletActions";

export default function useGetAllWalletUser() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.getAllWalletUserReducer
  );

  useEffect(() => {
    dispatch(getAllWalletUser());
  }, []);

  return [data, loading, error];
}
