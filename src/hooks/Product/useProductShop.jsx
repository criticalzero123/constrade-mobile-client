import { useEffect } from "react";
import { useState } from "react";
import { getShopFromName } from "../../../redux/actions/priceActions";

export default function useProductShop(name) {
  const [shop, setShop] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getShopFromName(name);
      setShop(res);
    };
    fetch();

    return () => setShop();
  }, [name]);

  return [shop];
}
