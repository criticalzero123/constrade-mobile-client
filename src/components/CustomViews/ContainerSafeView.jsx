import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { StatusBar as StatusBarExpo } from "expo-status-bar";
import React from "react";

export default function ContainerSafeView({
  children,
  styleName,
  colorStatusBar = "dark",
}) {
  return (
    <SafeAreaView style={styles.container} className={styleName}>
      <StatusBarExpo style={colorStatusBar} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
});
