import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGoogleAuthLogin } from "./useGoogleAuthLogin";
import { useGoogleAuthSignUp } from "./useGoogleAuthSignUp";

export const useGoogleAuthAction = (userInfo, type) => {
  const { loading } = useSelector((state) => state.checkEmailReducer);

  const [result, setResult] = useState({
    user: undefined,
    token: undefined,
    apiKey: undefined,
    from: type,
    success: false,
  });

  const { authRegister } = useGoogleAuthSignUp(userInfo, type);
  const { authLogin } = useGoogleAuthLogin(userInfo && userInfo.email, type);

  useEffect(() => {
    if (loading) return;
    if (authRegister.success)
      setResult({
        user: authRegister.user,
        token: authRegister.token,
        apiKey: authRegister.apiKey,
        success: authRegister.success,
      });
    else if (authLogin.success)
      setResult({
        user: authLogin.user,
        token: authLogin.token,
        apiKey: authLogin.apiKey,
        success: authLogin.success,
      });
  }, [authRegister, authLogin, loading]);

  return result;
};
