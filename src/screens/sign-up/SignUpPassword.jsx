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

export default function SignUpPassword({ route }) {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { value } = route.params;

  const getState = useSelector(
    (state) => state.emailAndPasswordRegisterReducer
  );

  const { error, loading, success, user } = getState;

  const dispatch = useDispatch();

  const onSubmit = () => {
    const user = {
      User_type: "semi-verified",
      Person: {
        FirstName: value.firstName,
        LastName: value.lastName,
      },
      AuthProvider_type: "none",
      Subscription_type: "free",
      User_status: "active",
      Email: value.emailOrPhone,
      Password: password,
      ImageUrl: "",
      CountPost: 0,
      DateCreated: new Date(),
      LastActiveAt: new Date(),
    };

    dispatch(emailAndPasswordRegister(user));
  };

  useEffect(() => {
    if (success) {
      navigation.navigate("WelcomeUser", {
        name: value.firstName + " " + value.lastName,
      });
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
