import { useEffect } from "react";
import {
  getChatByUserId,
  getUserByName,
} from "../../../redux/actions/userMessageAction";
import useGetCurrentUser from "../useGetCurrentUser";
import { useState } from "react";

export default function usePersonalList() {
  const { user } = useGetCurrentUser();
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getChatByUserId(user.userId);
      setData(res);
    };

    fetch();
  }, []);

  const searchUser = (name) => {
    return getUserByName(name);
  };

  return { data, searchUser };
}
