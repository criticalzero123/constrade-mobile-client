import { useState } from "react";
import { useEffect } from "react";
import { useGoogleAuthLogin } from "./useGoogleAuthLogin";
import { useGoogleAuthSignUp } from "./useGoogleAuthSignUp";

export const useGoogleAuthAction = (userInfo, type) => {
  const [result, setResult] = useState({
    user: undefined,
    from: undefined,
    success: false,
  });

  const { authRegister } = useGoogleAuthSignUp(userInfo, type);
  const { authLogin } = useGoogleAuthLogin(userInfo && userInfo.email, type);

  useEffect(() => {
    if (authRegister.success)
      setResult({
        user: authRegister.user,
        from: type,
        success: authRegister.success,
      });
    else if (authLogin.success)
      setResult({
        user: authLogin.user,
        from: type,
        success: authLogin.success,
      });
  }, [authRegister, authLogin]);

  return result;
};
