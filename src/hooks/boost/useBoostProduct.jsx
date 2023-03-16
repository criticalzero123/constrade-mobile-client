import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductBoost,
  cancelProductBoost,
  getProductBoost,
} from "../../../redux/actions/productActions";

export default function useBoostProduct(id) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getProductBoostReducer);
  useEffect(() => {
    if (id === undefined) return;

    dispatch(getProductBoost(id));
  }, [id]);

  const addBoost = (id, days) => {
    addProductBoost(id, days);
  };

  const cancelBoost = (id) => {
    cancelProductBoost(id);
  };

  return [data, addBoost, cancelBoost];
}
