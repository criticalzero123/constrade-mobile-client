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

  const dispatch = useDispatch();

  const { success, loading } = useSelector(
    (state) => state.changePasswordEmailReducer
  );

  const onSubmit = () => {
    setOnLoading(true);

    const info = {
      email: email,
      newPassword: password,
    };

    dispatch(changePasswordEmail(info));
  };

  useEffect(() => {
    if (loading || loading === undefined) return;

    if (success) {
      alert("Change password is successful");
      navigation.navigate("SignInEmail");
    } else {
      alert("Something went wrong");
    }
  }, [loading, success]);

  return (
    <ContainerSafeView>
      <PasswordValidatedInput
        password={password}
        loading={onLoading}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
