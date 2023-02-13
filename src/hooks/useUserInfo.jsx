import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useUserInfo = (response, checkEmail) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((res) => {
        setUserInfo(res.user);
        checkEmail(res.user.email);
      });
    }
  }, [response]);

  return { userInfo };
};
