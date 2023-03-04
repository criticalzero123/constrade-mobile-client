import { useDispatch } from "react-redux";
import { reportProduct } from "../../../redux/actions/productActions";

export default function useProductReport() {
  const dispatch = useDispatch();

  const productReport = (info) => {
    dispatch(reportProduct(info));
  };

  return { productReport };
}
