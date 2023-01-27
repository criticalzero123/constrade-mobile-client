import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/sign-in/SignInHeader";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import SimpleButton from "../../components/buttons/SimpleButton";

export default function SignUpName({ route }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { emailOrPhone } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View className="my-10"></View>
      <Header
        showLogo={false}
        bodyText="But first, tell us a little bit about yourself."
        headerText="Welcome to Constrade!"
      />
      <CustomTextInput
        label="First name"
        placeholder="First name"
        setValue={setFirstName}
        value={firstName}
        name={true}
      />
      <View className="my-2"></View>
      <CustomTextInput
        label="Last name"
        placeholder="Last name"
        setValue={setLastName}
        value={lastName}
        name={true}
      />
      <View className="my-5"></View>
      <SimpleButton
        disabled={firstName.length === 0 || lastName.length === 0}
        to="SignUpPassword"
        value={{ firstName, lastName, emailOrPhone }}
      >
        Next
      </SimpleButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 25,
  },
});
