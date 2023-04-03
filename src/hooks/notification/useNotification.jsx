import { useEffect, useState } from "react";
import { getNotificationUser } from "../../../redux/actions/notificationAction";

export default function useNotification(userId) {
  const [data, setData] = useState();
  useEffect(() => {
    if (userId === undefined) return;

    const fetch = async () => {
      const res = await getNotificationUser(userId);
      const tempList = res
        .sort((a, b) => {
          return (
            new Date(a.notificationDate).getTime() -
            new Date(b.notificationDate).getTime()
          );
        })
        .reverse();

      setData(tempList);
    };
    fetch();
  }, []);

  return [data];
}
