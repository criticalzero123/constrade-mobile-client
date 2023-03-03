import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import useOtp from "../../hooks/Otp/useOtp";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ForgetEmailScreen() {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [otpRequest, success, loading] = useOtp();

  useEffect(() => {
    if (loading || loading === undefined) return;
    if (success) navigation.navigate("Otp", { value, type: "forgetpassword" });
  }, [success, loading]);

  return (
    <ContainerSafeView>
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border mb-2"
      />
      <Pressable
        className="items-center border p-4"
        onPress={() => otpRequest(value)}
      >
        <Text>send</Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
