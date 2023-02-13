import { StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { checkEmail } from "../../../redux/actions/authActions";

export default function SignInAndSignUpButton({
  to,
  type,
  value,
  checkValue = false,
  loading,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onValidate = () => {
    if (type === "signup" && checkValue) {
      dispatch(checkEmail(value));
    } else navigation.navigate(to, { value, type });
  };

  return (
    <Pressable
      onPress={onValidate}
      className={`w-full ${
        loading ? "bg-[#ee8768]" : " bg-[#CC481F] "
      } py-4 rounded flex-row justify-center `}
      disabled={loading ? true : false}
    >
      <Text className=" font-semibold text-white text-base ">
        {loading && <ActivityIndicator size="small" color="white" />}{" "}
        {type === "signin" ? " Continue" : " Get OTP"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
