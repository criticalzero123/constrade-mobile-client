import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  Pressable,
} from "react-native";
import React from "react";

import GoogleButton from "../../components/buttons/GoogleButton";
import LineTextCenter from "../../components/line-text-center/LineTextCenter";
import LoginMethodButton from "../../components/buttons/LoginMethodButton";
import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";
import SignInHeader from "../../components/sign-in/SignInHeader";

import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <SignInHeader
        headerText="Welcome back"
        bodyText="You can login into your account by using any of the following."
      />

      <GoogleButton text="Sign in using Google" type="signin" />

      <LineTextCenter text="or continue using" />

      <View className="flex-row w-full justify-between px-2">
        <LoginMethodButton
          Icon={<Feather name="phone" size={24} color="#CC481F" />}
          text="Phone"
        />

        <LoginMethodButton
          Icon={
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="#CC481F"
            />
          }
          text="Email"
          onPress={() => navigation.navigate("SignInEmail")}
        />
      </View>

      <Pressable className="mt-7">
        <Text className="text-[#CC481F]">I don't have an account</Text>
      </Pressable>

      <TermsAndCondition />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
