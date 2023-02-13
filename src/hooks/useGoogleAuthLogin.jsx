import { useDispatch, useSelector } from "react-redux";
import { googleAuthLogin } from "../../redux/actions/authActions";
import { useMemo } from "react";

export const useGoogleAuthLogin = (email, exist, type) => {
  const dispatch = useDispatch();
  const authLogin = useSelector((state) => state.googleAuthLoginReducer);

  useMemo(() => {
    if (exist === undefined || type !== "signin" || authLogin === undefined)
      return;
    if (!exist) {
      alert("User Not Found");
      return;
    }

    dispatch(googleAuthLogin(email));
  }, [dispatch, email, exist, type]);

  return { authLogin };
};
