import { useState } from "react";
import { useEffect } from "react";
import {
  googleAuthLogin,
  googleAuthRegister,
} from "../../redux/actions/authActions";

import { getFirstName, getLastName } from "../../service/userNameService";

export const useGoogleAuthAction = (userInfo, type) => {
  const [result, setResult] = useState({
    user: undefined,
    token: undefined,
    apiKey: undefined,
    success: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo === undefined) return;
    setLoading(true);

    const fetch = async () => {
      let result;
      if (type === "signin") {
        result = await googleAuthLogin(userInfo.email);
      } else {
        const user = {
          userType: userInfo.emailVerified ? "semi-verified" : "non-verified",
          authproviderType: "google",
          email: userInfo.email,
          password: "",
          imageUrl: userInfo.photoURL,
          firebaseId: userInfo.uid,
          userStatus: "active",
        };

        const person = {
          firstname: getFirstName(userInfo.displayName),
          lastname: getLastName(userInfo.displayName),
        };

        result = await googleAuthRegister({ user, person });
      }

      if (result !== undefined) {
        setResult({
          user: result.user,
          token: result.token,
          apiKey: result.apiKey,
          success: true,
        });
      } else {
        if (type === "signin") {
          alert("User doesn't exist");
        }
        if (type === "signup") {
          alert("User exist");
        }
      }
      setLoading(false);
    };

    fetch();
  }, [type, userInfo]);

  return { result, loading };
};
