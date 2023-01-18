import { StyleSheet, Text, View, Pressable, ToastAndroid } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function NavigationButton({ to, children, type, value }) {
  const navigation = useNavigation();

  const onValidate = () => {
    if (type === "email") {
      if (value === "jdcaramonte159@gmail.com") {
        ToastAndroid.show("success", ToastAndroid.SHORT);
        navigation.navigate(to);
        return;
      } else {
        ToastAndroid.show("failed", ToastAndroid.SHORT);
      }
    }

    if (type === "number") {
      ToastAndroid.show("number", ToastAndroid.SHORT);
    }
  };

  return (
    <Pressable
      onPress={onValidate}
      className="w-full bg-[#CC481F] py-4 rounded"
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({});
