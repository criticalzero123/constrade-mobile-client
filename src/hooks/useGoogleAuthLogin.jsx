import { useDispatch, useSelector } from "react-redux";
import { googleAuthLogin } from "../../redux/actions/authActions";
import { useEffect } from "react";

export const useGoogleAuthLogin = (email, type) => {
  const dispatch = useDispatch();

  const authLogin = useSelector((state) => state.googleAuthLoginReducer);
  const { exist } = useSelector((state) => state.checkEmailReducer);

  useEffect(() => {
    if (exist === undefined || type !== "signin") return;
    if (!exist) {
      alert("User Not Found");
      return;
    }

    dispatch(googleAuthLogin(email));
  }, [dispatch, email, exist, type]);

  return { authLogin };
};
