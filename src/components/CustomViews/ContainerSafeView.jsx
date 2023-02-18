import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";

export default function ContainerSafeView({ children, styleName }) {
  return (
    <SafeAreaView style={styles.container} className={styleName}>
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
