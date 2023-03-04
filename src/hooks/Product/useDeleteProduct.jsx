import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById } from "../../../redux/actions/productActions";

export default function useDeleteProduct() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.deleteProductByIdReducer
  );

  useEffect(() => {
    if (loading || loading === undefined) return;

    if (data) alert("Product Successfully deleted");
    else alert("Something went wrong in deleting product");
  }, [loading, data]);

  const deleteProduct = (productId) => {
    dispatch(deleteProductById(productId));
  };

  return [deleteProduct];
}
