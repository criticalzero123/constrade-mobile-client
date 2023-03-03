import { useDispatch } from "react-redux";
import { soldProduct } from "../../../redux/actions/transactionAction";

export default function useSoldProduct() {
  const dispatch = useDispatch();

  const markAsSoldProduct = (info) => {
    const newInfo = {
      ...info,
      getWanted: true,
      inAppTransaction: true,
      isReviewed: false,
      dateTransaction: new Date(),
    };
    dispatch(soldProduct(newInfo));
  };

  return { markAsSoldProduct };
}
