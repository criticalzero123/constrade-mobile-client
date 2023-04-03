import { useEffect } from "react";
import {
  cancelSubscription,
  getSubscriptionHistory,
  subscribeUser,
} from "../../../redux/actions/subscriptionAction";
import { useState } from "react";
import useGetCurrentUser from "../useGetCurrentUser";
import { useDispatch } from "react-redux";

export default function useSubscribe(userId) {
  const [historyData, setHistoryData] = useState();
  const [loading, setLoading] = useState(false);
  const _userInfo = useGetCurrentUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId === undefined) return;
    const fetch = async () => {
      const res = await getSubscriptionHistory(userId);
      setHistoryData(res);
    };
    fetch();
  }, []);

  const subscribe = async (userId) => {
    setLoading(true);
    const res = await subscribeUser(userId);
    if (res) {
      if (res.toLowerCase() === "success") {
        const user = {
          user: {
            ..._userInfo.user,
            userType: "premium",
          },
          person: {
            ..._userInfo.person,
          },
        };

        dispatch({ type: "USER_INFO", payload: user });

        return true;
      } else {
        alert(res);
      }
    } else {
      alert("Something went wrong in subscribing");
    }
    setLoading(false);
    return false;
  };

  const cancel = async (userId) => {
    setLoading(true);
    const res = await cancelSubscription(userId);

    if (res) {
      const user = {
        user: {
          ..._userInfo.user,
          userType: "verified",
        },
        person: {
          ..._userInfo.person,
        },
      };

      dispatch({ type: "USER_INFO", payload: user });

      return true;
    } else {
      alert("Something went wrong in subscribing");
    }
    setLoading(false);
    return false;
  };

  return { subscribe, historyData, cancel, loading };
}
