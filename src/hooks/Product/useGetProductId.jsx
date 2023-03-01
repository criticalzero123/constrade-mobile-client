import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../redux/actions/productActions";

export default function useGetProductId(productId, userId) {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state) => state.getProductByIdReducer
  );

  useEffect(() => {
    dispatch(getProductById(productId, userId === undefined ? "" : userId));
    return () => {
      dispatch({ type: "GET_PRODUCT_BY_ID_LEAVE" });
    };
  }, []);

  return { data, error, loading };
}
