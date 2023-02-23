import { StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  checkEmail,
  emailAndPasswordAuthLogin,
} from "../../../redux/actions/authActions";

export default function SignInAndSignUpButton({
  to,
  type,
  value,
  loginType,
  checkValue = false,
  loading,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onValidate = () => {
    if (value === null || value === undefined) return;
    if (type === "signup" && checkValue) {
      dispatch(checkEmail(value));
      return;
    } else if (type === "signin" && loginType === "email") {
      dispatch(emailAndPasswordAuthLogin(value));
      return;
    } else navigation.navigate(to, { value, type });
  };

  return (
    <Pressable
      onPress={onValidate}
      className={`w-full ${
        loading ? "bg-[#ee8768]" : " bg-[#CC481F] "
      } py-4 rounded flex-row justify-center items-center`}
      disabled={loading ? true : false}
    >
      {loading && <ActivityIndicator size="small" color="white" />}
      <Text className=" font-semibold text-white text-base ml-1">
        {type === "signin" ? " Continue" : " Get OTP"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
