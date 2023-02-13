import { Text, Pressable, View, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

import { WEB_CLIENT_ID } from "@env";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { getFirstName, getLastName } from "../../../service/userNameService";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmail,
  googleAuthRegister,
} from "../../../redux/actions/authActions";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton({ text, type }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const checkEmailReducer = useSelector((state) => state.checkEmailReducer);
  const { exist } = checkEmailReducer;

  const authRegister = useSelector((state) => state.googleAuthRegisterReducer);
  const { success, user } = authRegister;

  const navigation = useNavigation();

  useEffect(() => {
    if (
      userInfo === undefined ||
      Object.keys(checkEmailReducer).length === 0 ||
      checkEmailReducer.loading ||
      authRegister.loading ||
      exist
    )
      return;

    if (success) {
      navigation.navigate("WelcomeUser", { from: "signup", user: user });
      return;
    }

    if (type === "signup") {
      const data = {
        user_type: userInfo.emailVerified ? "semi-verified" : "non-verified",
        authprovider_type: "google",
        email: userInfo.email,
        password: "",
        imageUrl: userInfo.photoURL,
        firstname: getFirstName(userInfo.displayName),
        lastname: getLastName(userInfo.displayName),
      };
      dispatch(googleAuthRegister(data));
    }
  }, [dispatch, checkEmailReducer, authRegister, userInfo]);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((res) => {
        setUserInfo(res.user);
        dispatch(checkEmail(res.user.email));
      });
    }
  }, [response]);

  const onPressGoogle = () => {
    promptAsync();
  };

  return (
    <Pressable onPress={onPressGoogle} disabled={!request}>
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
