import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail } from "../../redux/actions/authActions";

export const useCheckEmail = () => {
  const dispatch = useDispatch();

  const checkUserEmail = (email) => {
    dispatch(checkEmail(email));
  };

  return [checkUserEmail];
};
