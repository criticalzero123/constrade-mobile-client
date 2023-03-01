import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/productActions";

export default function useGetAllProducts() {
  const { data, loading, error } = useSelector(
    (state) => state.getAllProductsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return [data, loading, error];
}
