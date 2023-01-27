import { StyleSheet, Text, View, Pressable } from "react-native";
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
}) {
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

      <Pressable
        onPress={onSubmit}
        className={`${
          meterValue !== 1 ? "bg-[#cc471f57] " : "bg-[#CC481F] "
        }w-full py-4 rounded`}
        disabled={meterValue !== 1}
      >
        <Text className="text-center font-semibold text-white text-base ">
          Create account
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
