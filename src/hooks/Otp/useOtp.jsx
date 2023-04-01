import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestOtpEmail } from "../../../redux/actions/authActions";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function useOtp() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const requestOtp = async (value) => {
    setLoading(true);
    const result = await requestOtpEmail(value);

    if (result) {
      navigation.navigate("Otp", { value, type: "forgetpassword" });
    } else {
      alert("Unable to send otp");
    }

    setLoading(false);
  };

  return [requestOtp, loading];
}
