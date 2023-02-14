import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useCheckEmail } from "./useCheckEmail";

export const useUserInfo = (response) => {
  const [userInfo, setUserInfo] = useState();
  const [checkUserEmail] = useCheckEmail();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((res) => {
        setUserInfo(res.user);
        checkUserEmail(res.user.email);
      });
    }
  }, [response]);

  return { userInfo };
};
