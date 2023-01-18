import { Text, Pressable, View, ToastAndroid } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { googleProvider } from "../../../firebase/authMethod";
import socialMediaAuth from "../../../firebase/authSocialMediaAuth";

export default function GoogleButton({ text, type }) {
  const onPressGoogle = async () => {
    if (type === "signin") {
      // const res = await socialMediaAuth(googleProvider);
      // ToastAndroid.show("success1" + res, ToastAndroid.LONG);

      // if (res.uid) {
      //   ToastAndroid.show("success" + res, ToastAndroid.SHORT);
      // }
      ToastAndroid.show("signin", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("signup", ToastAndroid.SHORT);
    }
  };

  return (
    <Pressable onPress={onPressGoogle}>
      <View className="bg-[#CC481F] rounded py-4 flex-row min-w-full justify-center items-center">
        <AntDesign name="google" size={24} color="white" />
        <View className="mx-1"></View>
        <Text className="text-white text-base font-semibold">{text}</Text>
      </View>
    </Pressable>
  );
}
