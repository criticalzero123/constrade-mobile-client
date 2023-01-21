import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { TextInput, ProgressBar } from "react-native-paper";

import passwordValidator, {
  passwordMeterChecker,
  passwordMeterColor,
  passwordMeterWord,
} from "../../../service/passwordValidator";
import SimpleButton from "../buttons/SimpleButton";

export default function PasswordValidatedInput({ password, setPassword }) {
  const valid = passwordValidator.validate(password) ? true : false;
  const [visible, setVisible] = useState(false);

  const meterValue = passwordMeterChecker(password);
  const meterColor = passwordMeterColor(meterValue);
  const meterWord = passwordMeterWord(meterValue);

  return (
    <View>
      <Text className="mb-1 text-base">Create Password</Text>
      <TextInput
        secureTextEntry={!visible}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        underlineColor="transparent"
        autoCapitalize="none"
        className={`border rounded ${
          password.length !== 0
            ? valid
              ? "border-green-500 bg-green-100"
              : "border-red-500 bg-red-100"
            : "border-gray-500"
        }`}
        right={
          <TextInput.Icon
            icon={!visible ? "eye" : "eye-off"}
            onPress={() => setVisible(!visible)}
          />
        }
        textContentType="password"
      />
      <View className="my-2"></View>
      {meterValue !== 0 && (
        <View>
          <Text className={`mb-2 text-base`} style={{ color: meterColor }}>
            {meterWord}
          </Text>
          <ProgressBar
            progress={meterValue}
            color={meterColor}
            className="rounded"
          />
        </View>
      )}
      <View className="my-6"></View>
      <SimpleButton to="WelcomeUser" from="signup" disabled={meterValue !== 1}>
        Create account
      </SimpleButton>
    </View>
  );
}

const styles = StyleSheet.create({});
