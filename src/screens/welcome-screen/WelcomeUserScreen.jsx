import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/actions/authActions";

export default function WelcomeUserScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { from, user } = route.params;

  const userReducer = useSelector((state) => state.userInfoReducer);

  useEffect(() => {
    // TODO:Temporary timer for logging in
    setTimeout(() => {
      dispatch(getUserInfo(user));
    }, 5000);
  }, [dispatch, user]);

  useEffect(() => {
    if (userReducer && userReducer.user !== undefined) {
      navigation.navigate("Menu");
    }
  }, [userReducer]);

  return (
    <SafeAreaView style={styles.container}>
      {user.imageUrl ? (
        <Image
          source={{ uri: user.imageUrl }}
          className="w-24 h-24 rounded-full"
        />
      ) : (
        <View className="w-24 h-24 bg-gray-500 rounded-full"></View>
      )}
      <View className="my-3"></View>
      <Text className="font-semibold text-xl">
        {from === "signin" ? "Glad to have you back, " : "Nice to meet you, "}
        <Text className="capitalize">
          {user && user.firstName + " " + user.lastName}!
        </Text>
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
