import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestOtpEmail } from "../../../redux/actions/authActions";

export default function useOtp() {
  const dispatch = useDispatch();
  const { success, loading } = useSelector(
    (state) => state.requestOtpEmailReducer
  );

  const requestOtp = (value) => {
    dispatch(requestOtpEmail(value));
  };

  return [requestOtp, success, loading];
}
