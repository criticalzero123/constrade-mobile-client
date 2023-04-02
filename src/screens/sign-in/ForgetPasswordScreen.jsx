import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import PasswordValidatedInput from "../../components/CustomTextInput/PasswordValidatedInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordEmail } from "../../../redux/actions/authActions";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ForgetPasswordScreen({ route }) {
  const { email } = route.params;
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [onLoading, setOnLoading] = useState(false);

  const onSubmit = async () => {
    setOnLoading(true);

    const info = {
      email: email,
      newPassword: password,
    };

    const res = await changePasswordEmail(info);

    if (res) {
      alert("Change password is successful");
      navigation.navigate("SignInEmail");
    } else {
      alert("Cannot change password because it is google auth");
      setOnLoading(false);
    }
  };

  return (
    <ContainerSafeView>
      <PasswordValidatedInput
        password={password}
        loading={onLoading}
        setPassword={setPassword}
        onSubmit={onSubmit}
        forgotPassword={true}
      />
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
