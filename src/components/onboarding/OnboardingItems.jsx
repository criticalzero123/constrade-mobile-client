import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import SignInButton from "../buttons/SignInButton";
import SignUpButton from "../buttons/SignUpButton";

export default function OnboardingItems({ item }) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.4, justifyContent: "flex-end" }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={{ marginVertical: 20 }}></View>
        <SignUpButton onPress={() => navigation.navigate("SignUp")} />
        <SignInButton onPress={() => navigation.navigate("SignIn")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    flex: 0.6,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#011B33",
    textAlign: "center",
  },
  description: {
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
