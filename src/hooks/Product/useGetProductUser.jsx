import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByUser } from "../../../redux/actions/productActions";

export default function (userId) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.getProductByUserReducer
  );

  useEffect(() => {
    dispatch(getProductByUser(userId));
  }, [userId]);

  return [data, loading, error];
}
