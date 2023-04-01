import * as Google from "expo-auth-session/providers/google";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";

import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { useEffect } from "react";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    clientId: WEB_CLIENT_ID,
  });
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (response === undefined) return;
    const googleAuthInfo = async () => {
      try {
        if (response?.type === "success") {
          let token = response.authentication.accessToken;

          const auth = getAuth();
          const credential = GoogleAuthProvider.credential(null, token);

          signInWithCredential(auth, credential).then((res) => {
            setUserInfo(res.user);
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    googleAuthInfo();
  }, [response]);

  return [request, promptAsync, userInfo];
};
