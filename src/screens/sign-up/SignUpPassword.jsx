import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/sign-in/SignInHeader";
import PasswordValidatedInput from "../../components/CustomTextInput/PasswordValidatedInput";
import { emailAndPasswordRegister } from "../../../redux/actions/authActions";
import { StackActions, useNavigation } from "@react-navigation/native";

import { createWithEmailAndPassword } from "../../../firebase/firebaseAuth";

export default function SignUpPassword({ route }) {
  const [onLoading, setOnLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { value } = route.params;
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const onSubmit = async () => {
    setOnLoading(true);
    const user = {
      userType: "semi-verified",
      authProviderType: "email",
      userStatus: "active",
      email: value.emailOrPhone,
      password: password,
      imageUrl: image,
    };
    const person = {
      firstname: value.firstName,
      lastname: value.lastName,
    };
    try {
      const gResult = await createWithEmailAndPassword(user, person);
      const res = await emailAndPasswordRegister(gResult);

      if (res) {
        setOnLoading(false);

        navigation.dispatch(
          StackActions.replace("WelcomeUser", {
            from: "signup",
            user: res.user,
            apiKey: res.apiKey,
            token: res.token,
          })
        );
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="my-16">
        <Pressable
          onPress={() =>
            navigation.dispatch(StackActions.replace("SignUpOptions"))
          }
        >
          <Text>X</Text>
        </Pressable>
      </View>
      <Header
        showLogo={false}
        headerText="Secure your account"
        bodyText="Finalize your account by creating a strong password"
      />
      <PasswordValidatedInput
        password={password}
        loading={onLoading}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
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
