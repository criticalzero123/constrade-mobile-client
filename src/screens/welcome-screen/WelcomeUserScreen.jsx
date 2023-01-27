import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeUserScreen({ route }) {
  const [counter, setCounter] = useState(0);

  const navigation = useNavigation();

  const { from, name } = route.params;

  useEffect(() => {
    // TODO:Temporary timer for logging in
    if (counter > 5) navigation.navigate("Menu");

    const timer = setTimeout(() => setCounter(counter + 1), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return (
    <SafeAreaView style={styles.container}>
      <View className="w-24 h-24 bg-gray-500 rounded-full"></View>
      <View className="my-3"></View>
      <Text className="font-semibold text-xl">
        {from === "signin" ? "Glad to have you back, " : "Nice to meet you, "}
        <Text className="capitalize">{name && name}!</Text>
      </Text>
      <View className="my-1"></View>
      <Text className="text-center text-gray-400">
        {from === "signin"
          ? "Hang on tight, we are logging you in. This will just take a few seconds."
          : "Your account has been successfully create! Please wait while we get things ready for you."}
      </Text>

      <View className="flex-row absolute bottom-2 items-center">
        <ActivityIndicator size="small" color="#CC481F" />
        <View className="mx-1"></View>
        <Text className="text-[#CC481F] text-base">Almost there...</Text>
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
