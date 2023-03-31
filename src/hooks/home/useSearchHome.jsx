import { useEffect, useState } from "react";
import { getSearchResult } from "../../../redux/actions/homeActions";

export default function useSearchHome(search) {
  const [result, setResult] = useState();
  useEffect(() => {
    if (search === undefined) return;

    const fetch = async () => {
      const res = await getSearchResult(search);

      setResult(res);
    };

    fetch();
  }, []);

  return [result];
}
