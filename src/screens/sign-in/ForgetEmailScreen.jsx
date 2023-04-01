import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import useOtp from "../../hooks/Otp/useOtp";
import { ActivityIndicator } from "react-native";

export default function ForgetEmailScreen() {
  const [value, setValue] = useState("");
  const [otpRequest, loading] = useOtp();

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
        disabled={loading}
      >
        {loading ? <ActivityIndicator /> : <Text>send</Text>}
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
