import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/sign-in/SignInHeader";
import PasswordValidatedInput from "../../components/CustomTextInput/PasswordValidatedInput";
import { emailAndPasswordRegister } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { createWithEmailAndPassword } from "../../../firebase/firebaseAuth";

export default function SignUpPassword({ route }) {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { value } = route.params;

  const getState = useSelector(
    (state) => state.emailAndPasswordRegisterReducer
  );

  const { error, loading, success, user } = getState;

  {
    /* TODO: like +639999999999 or 09999999999 t o => 639999999999 when saving in the database */
  }
  const onSubmit = async () => {
    const userInfo = {
      user_type: "semi-verified",
      authprovider_type: "email",
      email: value.emailOrPhone,
      password: password,
      imageUrl: "",
      firstname: value.firstName,
      lastname: value.lastName,
    };

    createWithEmailAndPassword(userInfo)
      .then((user) => {
        dispatch(emailAndPasswordRegister(user));
      })
      .catch((code, message) => {
        console.log(code, message);
      });
  };

  useEffect(() => {
    if (success) {
      navigation.navigate("WelcomeUser", { from: "signup", user: user });
    } else {
      navigation.navigate("SignUp");
    }
  }, [getState]);

  return (
    <SafeAreaView style={styles.container}>
      <View className="my-16"></View>
      <Header
        showLogo={false}
        headerText="Secure your account"
        bodyText="Finalize your account by creating a strong password"
      />
      <PasswordValidatedInput
        password={password}
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
