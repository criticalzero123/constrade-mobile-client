import { useState } from "react";
import { useEffect } from "react";
import { getPricesFromQuery } from "../../../redux/actions/priceActions";

export default function useProductPrice(query) {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getPricesFromQuery(query);
      setProducts(res);
    };
    fetch();

    return () => setProducts();
  }, [query]);

  return [products];
}
