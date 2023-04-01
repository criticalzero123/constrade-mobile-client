import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import useOtp from "../../hooks/Otp/useOtp";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
export default function ForgetEmailScreen() {
  const [value, setValue] = useState("");
  const [otpRequest, loading] = useOtp();
  const navigation = useNavigation();
  return (
    <ContainerSafeView>
      <View className="flex-1 mx-10 justify-center">
        <Text className="mb-2 text-start font-semibold text-2xl">
          Forgot password?
        </Text>
        <Text className="mb-10 text-start text-gray-400">
          No worries, we got you! Please input email below.
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
          className="border-b border-b-gray-300 text-gray-400 text-base mb-2 w-full"
        />
        <Pressable
          className="items-center bg-[#CC481F] p-4 mt-5 "
          onPress={() => otpRequest(value)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-white font-semibold">Reset password</Text>
          )}
        </Pressable>
        <Pressable
          className="items-center mt-10 justify-center flex-row"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back-sharp" size={24} color="gray" />
          <Text className="font-semibold ml-2 text-gray-400">
            Back to login
          </Text>
        </Pressable>
      </View>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
