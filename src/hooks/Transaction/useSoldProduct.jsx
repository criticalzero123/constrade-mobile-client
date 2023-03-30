import { soldProduct } from "../../../redux/actions/transactionAction";

export default function useSoldProduct() {
  const markAsSoldProduct = (info) => {
    const newInfo = {
      ...info,
      getWanted: true,
      inAppTransaction: true,
      isReviewed: false,
      dateTransaction: new Date(),
    };
    return soldProduct(newInfo);
  };

  return { markAsSoldProduct };
}
