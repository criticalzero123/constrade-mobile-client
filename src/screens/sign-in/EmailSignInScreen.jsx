import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";
import SignInHeader from "../../components/sign-in/SignInHeader";
import EmailTextInput from "../../components/CustomTextInput/EmailTextInput";
import NavigationButton from "../../components/buttons/NavigationButton";

export default function EmailSignInScreen() {
  const [email, setEmail] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <SignInHeader
        headerText="Sign in using email"
        bodyText="Proceed using your email address. We will use this for OTP verification"
      />

      <EmailTextInput email={email} setEmail={setEmail} />
      <View className="my-3"></View>
      <NavigationButton to="SignInEmailOtp" type="email" value={email}>
        <Text className="text-center font-semibold text-white text-base ">
          Continue
        </Text>
      </NavigationButton>

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
