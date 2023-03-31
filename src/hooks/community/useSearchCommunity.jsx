import { useEffect, useState } from "react";
import { searchCommunity } from "../../../redux/actions/communityAction";

export default function useSearchCommunity(search, userId) {
  const [result, setResult] = useState();
  useEffect(() => {
    if (search === undefined || userId === undefined) return;

    const fetch = async () => {
      const res = await searchCommunity(search, userId);

      setResult(res);
    };

    fetch();
  }, []);

  return [result];
}
