import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/sign-in/SignInHeader";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import NavigationButton from "../../components/buttons/NavigationButton";
import LineTextCenter from "../../components/line-text-center/LineTextCenter";
import GoogleButton from "../../components/buttons/GoogleButton";
import { useNavigation } from "@react-navigation/native";

import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";
import { useSelector } from "react-redux";
import { Portal, Dialog, Provider, Button } from "react-native-paper";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getChecker = useSelector((state) => state.checkEmailReducer);
  const { error, loading, success, exist } = getChecker;

  useEffect(() => {
    if (loading) return;

    if (success && exist) {
      setModalVisible(true);
    } else if (success && !exist) {
      navigation.navigate("Otp", { value, type: "signup" });
    }
  }, [getChecker]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
      style={styles.container}
    >
      <Provider>
        <View style={{ paddingHorizontal: 25, flex: 1 }}>
          <Header
            headerText="Create your account"
            bodyText="Proceed using your email or phone number. We will use this for OTP Verification."
          />

          {/* TODO: only email got a checker make also for the phone in the future and make it uniform */}
          <CustomTextInput
            value={value}
            setValue={setValue}
            label="Email or phone number (Email pa ang pwede)"
            placeholder="Enter your mobile or email"
          />

          <View className="my-4"></View>
          <NavigationButton
            type="signup"
            to="Otp"
            value={value}
            checkValue={true}
            loading={loading}
            exist={exist}
          />

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

          <Portal>
            <Dialog
              visible={modalVisible}
              onDismiss={() => setModalVisible(!modalVisible)}
            >
              <Dialog.Title>Notice</Dialog.Title>
              <Dialog.Content>
                <Text>Email already been used.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setModalVisible(!modalVisible)}>
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
