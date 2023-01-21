import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/sign-in/SignInHeader";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import SimpleButton from "../../components/buttons/SimpleButton";

export default function SignUpName() {
  const [name, setName] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View className="my-10"></View>
      <Header
        showLogo={false}
        bodyText="But first, tell us a little bit about yourself."
        headerText="Welcome to Constrade!"
      />
      <CustomTextInput
        label="Your name is"
        placeholder="Full name"
        setValue={setName}
        value={name}
      />
      <View className="my-5"></View>
      <SimpleButton disabled={name.length === 0} to="SignUpPassword">
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
