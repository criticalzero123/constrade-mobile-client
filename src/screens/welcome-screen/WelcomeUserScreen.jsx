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

export default function WelcomeUserScreen() {
  const [counter, setCounter] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    // Temporary timer for logging in

    if (counter > 5) navigation.navigate("User");

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
        Glad to have you back, name!
      </Text>
      <View className="my-1"></View>
      <Text className="text-center text-gray-400">
        Hang on tight, we are logging you in. This will just take a few seconds.
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
