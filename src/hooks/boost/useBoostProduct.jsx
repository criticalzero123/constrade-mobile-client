import { useEffect } from "react";
import {
  addProductBoost,
  cancelProductBoost,
  getProductBoost,
} from "../../../redux/actions/productActions";
import { useState } from "react";

export default function useBoostProduct(id) {
  const [data, setData] = useState();

  useEffect(() => {
    if (id === undefined) return;

    const fetch = async () => {
      const res = await getProductBoost(id);

      setData(res);
    };
    fetch();
  }, [id]);

  const addBoost = (days, userId) => {
    addProductBoost(id, days, userId);
  };

  const cancelBoost = (id) => {
    cancelProductBoost(id);
  };

  return [data, addBoost, cancelBoost];
}
