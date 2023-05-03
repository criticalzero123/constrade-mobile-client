import { useEffect, useState } from "react";
import { getSearchResultGenre } from "../../../redux/actions/homeActions";
import { platformUniqueFilter } from "../../../service/filterService";

export default function useSearchGenre(search) {
  const [result, setResult] = useState();

  const [platformList, setPlatformList] = useState([]);

  useEffect(() => {
    if (search === undefined) return;

    const fetch = async () => {
      const res = await getSearchResultGenre(search);

      setPlatformList(["all", ...platformUniqueFilter(res)]);

      setResult(res);
    };

    fetch();
  }, [search]);

  return [result, platformList];
}
