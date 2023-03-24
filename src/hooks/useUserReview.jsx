import { useState } from "react";
import { useEffect } from "react";
import { getMyAverageRate } from "../../redux/actions/reviewAction";

export default function useUserReview(userId) {
  const [average, setAverage] = useState();
  useEffect(() => {
    const fetch = async () => {
      const result = await getMyAverageRate(userId);

      setAverage(result);
    };

    fetch();
  }, [userId]);

  return [average];
}
