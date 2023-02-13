import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail } from "../../redux/actions/authActions";

export const useCheckEmail = () => {
  const dispatch = useDispatch();
  const checkEmailReducer = useSelector((state) => state.checkEmailReducer);

  const checkUserEmail = (email) => {
    dispatch(checkEmail(email));
  };

  return [checkEmailReducer, checkUserEmail];
};
