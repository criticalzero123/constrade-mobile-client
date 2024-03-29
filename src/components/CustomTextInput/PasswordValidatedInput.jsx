import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import { TextInput, ProgressBar } from "react-native-paper";

import passwordValidator, {
  passwordMeterChecker,
  passwordMeterColor,
  passwordMeterWord,
} from "../../../service/passwordValidator";

export default function PasswordValidatedInput({
  password,
  setPassword,
  onSubmit,
  loading,
  forgotPassword = false,
}) {
  const [visible, setVisible] = useState(false);
  const valid = passwordValidator.validate(password) ? true : false;

  const meterValue = passwordMeterChecker(password);
  const meterColor = passwordMeterColor(meterValue);
  const meterWord = passwordMeterWord(meterValue);

  return (
    <View>
      <Text className="mb-1 text-base">
        {forgotPassword ? "Enter Password" : "Create password"}
      </Text>
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
      <Text className="text-gray-400">
        Please input atleast 8 characters with a uppercase, lowercase letter and
        a numbeer.
      </Text>
      <View className="my-4"></View>
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

      <Pressable
        onPress={onSubmit}
        className={`${
          meterValue !== 1 ? "bg-[#cc471f57] " : "bg-[#CC481F] "
        }w-full py-4 rounded flex-row items-center justify-center`}
        disabled={meterValue !== 1 || loading}
      >
        {loading && <ActivityIndicator size="small" />}
        <Text className="text-center font-semibold text-white text-base ml-2">
          {forgotPassword ? "Done" : "Create account"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
