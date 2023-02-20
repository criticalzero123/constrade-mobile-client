import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import SignInAndSignUpButton from "../buttons/SignInAndSignUpButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function EmailOrPhone() {
  const [value, setValue] = useState("");
  const { success, exist, loading } = useSelector(
    (state) => state.checkEmailReducer
  );

  const navigation = useNavigation();

  useEffect(() => {
    console.log(success, exist, value);
    if (success && !exist && value !== "") {
      navigation.navigate("Otp", { value, type: "signup" });
    }
  }, [success, exist]);

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
        loading={loading}
      />
    </>
  );
}

const styles = StyleSheet.create({});
