import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelSubscription,
  getSubscriptionHistory,
  subscribeUser,
} from "../../../redux/actions/subscriptionAction";

export default function useSubscribe(userId) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.subscribeUserReducer);

  const { data: historyData } = useSelector(
    (state) => state.getSubscriptionHistoryReducer
  );

  useEffect(() => {
    dispatch(getSubscriptionHistory(userId));

    return () => {
      dispatch({ type: "GET_SUBSCRIPTION_HISTORY_LEAVE" });
    };
  }, []);

  useEffect(() => {
    if (loading || loading === undefined) return;
    alert(data && data);

    return () => {
      dispatch({ type: "SUBSCRIBE_USER_LEAVE" });
    };
  }, [loading]);

  const subscribe = (userId) => {
    dispatch(subscribeUser(userId));
  };

  const cancel = (userId) => {
    return cancelSubscription(userId);
  };

  return { subscribe, data, historyData, cancel };
}
