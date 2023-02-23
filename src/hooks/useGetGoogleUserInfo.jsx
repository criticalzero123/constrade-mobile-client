import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useCheckEmail } from "./useCheckEmail";

export const useGetGoogleUserInfo = (response) => {
  const [userInfo, setUserInfo] = useState();
  const [checkUserEmail] = useCheckEmail();

  useEffect(() => {
    const googleAuthInfo = async () => {
      try {
        if (response?.type === "success") {
          let token = response.authentication.accessToken;

          const auth = getAuth();
          const credential = GoogleAuthProvider.credential(null, token);

          signInWithCredential(auth, credential).then((res) => {
            setUserInfo(res.user);
            checkUserEmail(res.user.email);
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    googleAuthInfo();
  }, [response]);

  return { userInfo };
};
