import { Text, Pressable, View, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import { getFirstName, getLastName } from "../../../service/userNameService";
import { useDispatch, useSelector } from "react-redux";
import {
  googleAuthLogin,
  googleAuthRegister,
} from "../../../redux/actions/authActions";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useGoogleAuthSignUp } from "../../hooks/useGoogleAuthSignUp";
import { useCheckEmail } from "../../hooks/useCheckEmail";
import { useGoogleAuthLogin } from "../../hooks/useGoogleAuthLogin";

export default function GoogleButton({ text, type }) {
  const [request, response, promptAsync] = useGoogleAuth();
  const [checkEmailReducer, checkUserEmail] = useCheckEmail();
  const { userInfo } = useUserInfo(response, checkUserEmail);
  const { authRegister } = useGoogleAuthSignUp(
    userInfo,
    checkEmailReducer.exist,
    type
  );
  const { authLogin } = useGoogleAuthLogin(
    userInfo && userInfo.email,
    checkEmailReducer.exist,
    type
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (
      userInfo === undefined ||
      Object.keys(checkEmailReducer).length === 0 ||
      checkEmailReducer.loading ||
      authRegister.loading
    )
      return;

    if (authRegister.success) {
      navigation.navigate("WelcomeUser", {
        from: "signup",
        user: authRegister.user,
      });
      return;
    }

    if (authLogin.success) {
      navigation.navigate("WelcomeUser", {
        user: authLogin.user,
        from: "signin",
      });
      return;
    }
  }, [checkEmailReducer, authRegister, userInfo, authLogin]);

  return (
    <Pressable onPress={() => promptAsync()} disabled={!request}>
      <View
        className={` rounded py-4 flex-row min-w-full justify-center items-center ${
          type === "signin" ? "bg-[#CC481F] " : "border border-[#CC481F]"
        }`}
      >
        <AntDesign
          name="google"
          size={24}
          color={`${type === "signin" ? "white" : "#CC481F"}`}
        />
        <View className="mx-1"></View>
        <Text
          className={`${
            type === "signin" ? "text-white" : "text-[#CC481F]"
          } text-base font-semibold`}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
