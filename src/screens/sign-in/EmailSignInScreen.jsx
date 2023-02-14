import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
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
export default function EmailSignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, user, error } = useSelector(
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
    if (error) console.log(error);

    navigation.dispatch(
      StackActions.replace("WelcomeUser", { user: user, from: "signin" })
    );
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerText="Sign in using email"
        bodyText="Proceed using your email address."
      />

      <EmailTextInput email={email} setEmail={setEmail} />
      <View className="my-2"></View>
      <PasswordTextInput password={password} setPassword={setPassword} />
      <View className="my-1"></View>
      <Text className="text-[#CC481F]">Forgot Password?</Text>
      <View className="my-4"></View>
      <SignInAndSignUpButton
        type="signin"
        loginType="email"
        value={onValidate()}
        loading={loading}
      />
      <TermsAndCondition />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
