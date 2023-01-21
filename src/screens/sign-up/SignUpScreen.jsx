import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/sign-in/SignInHeader";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import Checkbox from "expo-checkbox";
import NavigationButton from "../../components/buttons/NavigationButton";
import LineTextCenter from "../../components/line-text-center/LineTextCenter";
import GoogleButton from "../../components/buttons/GoogleButton";
import { useNavigation } from "@react-navigation/native";

import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
      style={styles.container}
    >
      <Header
        headerText="Create your account"
        bodyText="Proceed using your email or phone number. We will use this for OTP Verification."
      />

      <CustomTextInput
        value={value}
        setValue={setValue}
        label="Email or phone number"
        placeholder="Enter your mobile or email"
      />
      <View className="flex-row mt-3 items-center">
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#CC481F" : undefined}
        />
        <Text className="mx-1">Remember me</Text>
      </View>
      <View className="my-4"></View>
      <NavigationButton type="signup" to="Otp" value={value} />

      <LineTextCenter text="or" />

      <GoogleButton text="Sign up using Google" type="signup" />

      <View className="my-5"></View>

      <View className="flex-row items-center justify-center">
        <Text>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text className="text-[#CC481F] font-semibold text-base">
            Sign in
          </Text>
        </Pressable>
      </View>

      <TermsAndCondition />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
