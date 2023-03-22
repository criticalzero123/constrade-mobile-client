import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../redux/actions/productActions";

export default function useGetProductId(productId, userId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getProductByIdReducer);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (data === undefined) return;
    setIsFavorite(data.isFavorite);
  }, [data]);

  useEffect(() => {
    if (productId === undefined && userId === undefined) return;

    dispatch(getProductById(productId, userId === undefined ? "" : userId));

    return () => {
      dispatch({ type: "GET_PRODUCT_BY_ID_LEAVE" });
    };
  }, []);

  return { data, isFavorite, setIsFavorite };
}
