import { Text, Pressable, View, ToastAndroid } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";

export default function GoogleButton({ text, type }) {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"],
      webClientId:
        "956743431177-6gb13c9g12a1cht9k0toekp846e2s3pf.apps.googleusercontent.com",
      iosClientId:
        "956743431177-tf047dfcan75fofbntae7qt76t7grm2g.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }, []);

  const onPressGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await auth().signInWithCredential(credential);

      if (type === "signin") {
        ToastAndroid.show("signin", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("signup", ToastAndroid.SHORT);
      }
    } catch (e) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.error("Cancel", ToastAndroid.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show("Signin in progress", ToastAndroid.SHORT);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show("PLAY_SERVICES_NOT_AVAILABLE", ToastAndroid.SHORT);
        // play services not available or outdated
      } else {
        // some other error happened
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    }

    await console.log(GoogleSignin.getCurrentUser());
  };

  return (
    <Pressable onPress={onPressGoogle}>
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
