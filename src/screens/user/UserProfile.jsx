import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { signOut, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../redux/actions/authActions";
import { useNavigation } from "@react-navigation/native";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(signOutUser());
        navigation.navigate("SignIn");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>UserProfile</Text>
      <Pressable onPress={onSignOut}>
        <Text>Signout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
