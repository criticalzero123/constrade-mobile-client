import { useEffect, useState } from "react";
import { getNotificationUser } from "../../../redux/actions/notificationAction";

export default function useNotification(userId) {
  const [data, setData] = useState();
  useEffect(() => {
    if (userId === undefined) return;

    const fetch = async () => {
      const res = await getNotificationUser(userId);

      setData(res);
    };
    fetch();
  }, []);

  return [data];
}
