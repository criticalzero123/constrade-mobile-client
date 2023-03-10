import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function useUserAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useSelector((state) => state.userInfoReducer);
  useEffect(() => {
    if (user !== null && user !== undefined) {
      setIsAuthenticated(true);
      return;
    }

    setIsAuthenticated(false);
  }, [user]);

  return [isAuthenticated];
}
