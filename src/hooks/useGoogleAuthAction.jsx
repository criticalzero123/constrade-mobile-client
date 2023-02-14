import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGoogleAuthLogin } from "./useGoogleAuthLogin";
import { useGoogleAuthSignUp } from "./useGoogleAuthSignUp";

export const useGoogleAuthAction = (userInfo) => {
  const [result, setResult] = useState({
    user: undefined,
    from: undefined,
    success: false,
  });

  const { request } = useSelector((state) => state.loginMethodReducer);

  const { authRegister } = useGoogleAuthSignUp(userInfo, request);
  const { authLogin } = useGoogleAuthLogin(userInfo, request);

  useEffect(() => {
    if (authRegister.success)
      setResult({
        user: authRegister.user,
        from: request,
        success: authRegister.success,
      });
    else if (authLogin.success)
      setResult({
        user: authLogin.user,
        from: request,
        success: authLogin.success,
      });
  }, [authRegister, authLogin]);

  return result;
};
