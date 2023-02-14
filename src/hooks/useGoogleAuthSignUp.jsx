import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAuthRegister } from "../../redux/actions/authActions";
import { getFirstName, getLastName } from "../../service/userNameService";

export const useGoogleAuthSignUp = (userInfo, type) => {
  const dispatch = useDispatch();

  const authRegister = useSelector((state) => state.googleAuthRegisterReducer);
  const { exist } = useSelector((state) => state.checkEmailReducer);

  useEffect(() => {
    if (
      userInfo === undefined ||
      exist === undefined ||
      type !== "signup" ||
      exist
    )
      return;

    const data = {
      user_type: userInfo.emailVerified ? "semi-verified" : "non-verified",
      authprovider_type: "google",
      email: userInfo.email,
      password: "",
      imageUrl: userInfo.photoURL,
      firstname: getFirstName(userInfo.displayName),
      lastname: getLastName(userInfo.displayName),
    };
    dispatch(googleAuthRegister(data));
  }, [dispatch, exist, userInfo, type]);

  return { authRegister };
};
