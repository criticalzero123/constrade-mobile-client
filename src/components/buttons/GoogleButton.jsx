import { Text, Pressable, View } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useGoogleAuthAction } from "../../hooks/useGoogleAuthAction";
import { useDispatch } from "react-redux";

export default function GoogleButton({ text, type }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [request, response, promptAsync] = useGoogleAuth();
  const { userInfo } = useUserInfo(response);
  const { user, from, success } = useGoogleAuthAction(userInfo);

  useEffect(() => {
    if (user !== undefined) {
      navigation.navigate("WelcomeUser", {
        from: from,
        user: user,
      });
    }

    if (!success) dispatch({ type: "LOGIN_METHOD", payload: type });
  }, [user]);

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
