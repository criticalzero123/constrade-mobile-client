import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import SignInAndSignUpButton from "../buttons/SignInAndSignUpButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { requestOtpEmail } from "../../../redux/actions/authActions";

export default function EmailOrPhone() {
  const [value, setValue] = useState("");

  return (
    <>
      <CustomTextInput
        value={value}
        setValue={setValue}
        label="Email"
        placeholder="Enter your email"
      />

      <View className="my-4"></View>
      <SignInAndSignUpButton type="signup" to="Otp" value={value} />
    </>
  );
}

const styles = StyleSheet.create({});
