import { useEffect, useState } from "react";
import { getSearchResult } from "../../../redux/actions/homeActions";
import { platformUniqueFilter } from "../../../service/filterService";

export default function useSearchHome(search) {
  const [result, setResult] = useState();

  const [platformList, setPlatformList] = useState([]);

  useEffect(() => {
    if (search === undefined) return;

    const fetch = async () => {
      const res = await getSearchResult(search);

      setPlatformList(["all", ...platformUniqueFilter(res.products)]);

      setResult(res);
    };

    fetch();
  }, []);

  return [result, platformList];
}
