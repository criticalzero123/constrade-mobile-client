import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reportProduct } from "../../../redux/actions/productActions";

export default function useProductReport(itemName) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (itemName === undefined) return;
  }, [itemName]);

  const productReport = (info) => {
    dispatch(reportProduct(info));
  };

  return { productReport };
}
