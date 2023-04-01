import { StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  checkEmail,
  emailAndPasswordAuthLogin,
  requestOtpEmail,
} from "../../../redux/actions/authActions";
import { useState } from "react";

export default function SignInAndSignUpButton({ to, type, value, loginType }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onValidate = async () => {
    if (value === undefined) return;
    setLoading(true);

    if (type === "signup") {
      const res = await checkEmail(value);

      if (res) {
        alert("Email already exist");
        return;
      }

      const otpGenerated = await requestOtpEmail(value);
      if (otpGenerated) {
        setLoading(false);
        navigation.navigate("Otp", { value, type: "signup" });
      } else {
        alert("Cannot generate otp right now.");
      }
    } else if (type === "signin" && loginType === "email") {
      const result = await emailAndPasswordAuthLogin(value);
      if (result) {
        navigation.dispatch(
          StackActions.replace("WelcomeUser", {
            token: result.token,
            user: result.user,
            apiKey: result.apiKey,
            from: "signin",
          })
        );
        return;
      } else alert("User Does not exist.");
    } else {
      setLoading(false);
      navigation.navigate(to, { value, type });
    }
    setLoading(false);
  };

  return (
    <Pressable
      onPress={onValidate}
      className={`w-full ${
        loading ? "bg-[#ee8768]" : " bg-[#CC481F] "
      } py-4 rounded flex-row justify-center items-center`}
      disabled={loading}
    >
      {loading && <ActivityIndicator size="small" color="white" />}
      <Text className=" font-semibold text-white text-base ml-1">
        {type === "signin" ? " Continue" : " Get OTP"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
