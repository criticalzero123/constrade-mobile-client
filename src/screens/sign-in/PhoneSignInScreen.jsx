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
import PhoneTextInput from "../../components/CustomTextInput/PhoneTextInput";
import NavigationButton from "../../components/buttons/NavigationButton";

export default function PhoneSignInScreen() {
  const [phone, setPhone] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <SignInHeader
        headerText="Sign in using mobile number"
        bodyText="Proceed using your phone number. We will use this for OTP verification"
      />

      <PhoneTextInput phone={phone} setPhone={setPhone} />
      <View className="my-3"></View>
      <NavigationButton to="Otp" type="signin" value={phone} />

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
