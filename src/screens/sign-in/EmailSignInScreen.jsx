import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/sign-in/SignInHeader";

import EmailTextInput from "../../components/CustomTextInput/EmailTextInput";
import PasswordTextInput from "../../components/CustomTextInput/PasswordTextInput";
import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";
import SignInAndSignUpButton from "../../components/buttons/SignInAndSignUpButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import KeyboardHideView from "../../components/CustomViews/KeyboardHideView";
export default function EmailSignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, user, token, apiKey, error } = useSelector(
    (state) => state.emailAndPasswordAuthLoginReducer
  );

  const navigation = useNavigation();

  const onValidate = () => {
    return email.trim() !== "" && password.trim() !== ""
      ? { email, password }
      : null;
  };

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      alert("User Not Found!");
      return;
    }
    if (error) {
      console.log(error);
      return;
    }
    navigation.dispatch(
      StackActions.replace("WelcomeUser", {
        token: token,
        user: user,
        apiKey: apiKey,
        from: "signin",
      })
    );
  }, [user]);

  return (
    <KeyboardHideView>
      <Header
        headerText="Sign in using email"
        bodyText="Proceed using your email address."
      />

      <EmailTextInput email={email} setEmail={setEmail} />
      <View className="my-2"></View>
      <PasswordTextInput password={password} setPassword={setPassword} />
      <View className="my-1"></View>
      <Pressable onPress={() => navigation.navigate("ForgetPasswordEmail")}>
        <Text className="text-[#CC481F]">Forgot Password?</Text>
      </Pressable>
      <View className="my-4"></View>
      <SignInAndSignUpButton
        type="signin"
        loginType="email"
        value={onValidate()}
        loading={loading}
      />
      <TermsAndCondition />
    </KeyboardHideView>
  );
}

const styles = StyleSheet.create({});
