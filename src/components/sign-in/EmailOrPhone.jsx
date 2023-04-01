import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import SignInAndSignUpButton from "../buttons/SignInAndSignUpButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { requestOtpEmail } from "../../../redux/actions/authActions";

export default function EmailOrPhone() {
  const [value, setValue] = useState("");
  // const checkEmailR = useSelector((state) => state.checkEmailReducer);
  // const otpRequest = useSelector((state) => state.requestOtpEmailReducer);

  // const navigation = useNavigation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (
  //     otpRequest.loading ||
  //     checkEmailR.loading ||
  //     value === "" ||
  //     otpRequest.error
  //   )
  //     return;

  //   if (checkEmailR.success && !checkEmailR.exist && !otpRequest.success) {
  //     dispatch(requestOtpEmail(value));
  //     return;
  //   }

  //   if (otpRequest.success)
  //     navigation.navigate("Otp", { value, type: "signup" });
  // }, [otpRequest, checkEmailR]);

  return (
    <>
      {/* TODO: only email got a checker make also for the phone in the future and make it uniform */}
      <CustomTextInput
        value={value}
        setValue={setValue}
        label="Email or phone number (Email pa ang pwede)"
        placeholder="Enter your mobile or email"
      />

      <View className="my-4"></View>
      <SignInAndSignUpButton
        type="signup"
        to="Otp"
        value={value}
        checkValue={true}
        // loading={otpRequest.loading}
      />
    </>
  );
}

const styles = StyleSheet.create({});
