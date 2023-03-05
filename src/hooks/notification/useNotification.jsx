import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationUser } from "../../../redux/actions/notificationAction";

export default function useNotification(userId) {
  const dispatch = useDispatch();

  const { data, loading } = useSelector(
    (state) => state.getNotificationUserReducer
  );

  useEffect(() => {
    dispatch(getNotificationUser(userId));

    return () => {
      dispatch({ type: "GET_NOTIFICATION_BY_USER_LEAVE" });
    };
  }, []);

  return [data];
}
