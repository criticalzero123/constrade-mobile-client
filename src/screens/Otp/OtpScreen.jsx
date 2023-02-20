import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  View,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../../redux/actions/authActions";

export default function OtpScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { value, type } = route.params;
  const { loading, message } = useSelector((state) => state.verifyOtpReducer);

  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const count =
      counter > 0 &&
      setInterval(() => {
        setCounter((oldCount) => oldCount - 1);
      }, 1000);

    return () => {
      clearInterval(count);
    };
  }, [counter]);

  useEffect(() => {
    if (loading) return;

    switch (message) {
      case "WrongCode":
        ToastAndroid.show("Wrong OTP, Please Try again!", ToastAndroid.SHORT);
        setValidating(false);
        setOtp("");
        break;

      case "Success":
        if (type === "signin") {
          navigation.navigate("WelcomeUser", {
            user: value,
            from: "signin",
          });
        } else {
          navigation.navigate("SignUpName", { emailOrPhone: value });
        }
        break;
    }
  }, [loading, message]);

  const otpValidation = (newText) => {
    if (newText.length === 6) {
      setValidating(!validating);
      dispatch(verifyOtp(value, newText));
    }

    setOtp(newText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-3xl font-semibold text-center">Enter the code</Text>
      <Text className="text-gray-400 ">
        Please enter the OTP code sent to{" "}
        <Text className="text-black font-semibold text-base">{value}.</Text>
      </Text>

      <View className="my-5"></View>

      <TextInput
        editable={otp.length < 6}
        onChangeText={otpValidation}
        value={otp}
        keyboardType="number-pad"
        className="border py-4 text-2xl px-5 w-64 rounded text-center tracking-widest border-gray-300"
      />

      <View className="my-3"></View>

      {validating && (
        <View className="flex-row items-center">
          <ActivityIndicator size="small" color="#CC481F" />
          <View className="mx-1"></View>
          <Text className="text-[#CC481F]">Checking OTP. Please Wait</Text>
        </View>
      )}

      <View className="my-5"></View>
      <View className="flex-row">
        <Pressable onPress={() => setCounter(60)}>
          <Text
            className={`${
              counter > 0 ? "text-[#cc471f5d]" : "text-[#CC481F]"
            }  font-semibold`}
          >
            Resend OTP
          </Text>
        </Pressable>
        <Text
          className={`${counter > 0 ? "text-gray-400 " : "text-black"} ml-1`}
        >
          {!validating && counter}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
