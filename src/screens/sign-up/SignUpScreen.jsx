import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/sign-in/SignInHeader";
import LineTextCenter from "../../components/line-text-center/LineTextCenter";
import GoogleButton from "../../components/buttons/GoogleButton";
import { StackActions, useNavigation } from "@react-navigation/native";

import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";
import { useSelector } from "react-redux";
import { Portal, Dialog, Provider, Button } from "react-native-paper";
import EmailOrPhone from "../../components/sign-in/EmailOrPhone";
import KeyboardHideView from "../../components/CustomViews/KeyboardHideView";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const getChecker = useSelector((state) => state.checkEmailReducer);
  const { loading, success, exist } = getChecker;

  useEffect(() => {
    if (loading) return;
    if (success && exist) {
      setModalVisible(true);
    }
  }, [getChecker]);

  return (
    <KeyboardHideView>
      <ScrollView>
        <Provider>
          <View style={{ paddingHorizontal: 25, flex: 1 }}>
            <Header
              headerText="Create your account"
              bodyText="Proceed using your email or phone number. We will use this for OTP Verification."
            />

            <EmailOrPhone />

            <LineTextCenter text="or" />

            <GoogleButton text="Sign up using Google" type="signup" />

            <View className="my-5"></View>

            <View className="flex-row items-center justify-center">
              <Text>Already have an account? </Text>
              <Pressable
                onPress={() =>
                  navigation.dispatch(StackActions.replace("SignIn"))
                }
              >
                <Text className="text-[#CC481F] font-semibold text-base">
                  Sign in
                </Text>
              </Pressable>
            </View>

            {/* <TermsAndCondition /> */}

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
      </ScrollView>
    </KeyboardHideView>
  );
}

const styles = StyleSheet.create({});
