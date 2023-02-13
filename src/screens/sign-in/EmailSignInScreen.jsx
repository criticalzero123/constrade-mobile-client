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
export default function EmailSignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <SignInAndSignUpButton type="signin" value={email} to="WelcomeUser" />

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
