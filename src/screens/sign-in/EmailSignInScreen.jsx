import { Text, View, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import Header from "../../components/sign-in/SignInHeader";

import EmailTextInput from "../../components/CustomTextInput/EmailTextInput";
import PasswordTextInput from "../../components/CustomTextInput/PasswordTextInput";
import SignInAndSignUpButton from "../../components/buttons/SignInAndSignUpButton";
import { useNavigation } from "@react-navigation/native";
import KeyboardHideView from "../../components/CustomViews/KeyboardHideView";
export default function EmailSignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tries, setTries] = useState(0);
  const navigation = useNavigation();

  const onValidate = () => {
    if (tries === 3) {
      Alert.alert(
        "Information",
        "You have been wrong 3 times. Would you like to recover it using email?",
        [
          {
            text: "Cancel",
            onPress: () => setTries(0),
            style: "cancel",
          },
          {
            text: "Change Password",
            onPress: () => navigation.navigate("ForgetPasswordEmail"),
          },
        ]
      );

      return;
    }
    return email.trim() !== "" && password.trim() !== ""
      ? { email, password }
      : null;
  };

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
        triggerCount={() => setTries(tries + 1)}
      />
    </KeyboardHideView>
  );
}
