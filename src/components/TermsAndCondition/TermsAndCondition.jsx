import { Text, Pressable } from "react-native";
import React from "react";

export default function TermsAndCondition() {
  return (
    <Text className="text-center px-10 absolute bottom-1 text-gray-400 self-center">
      By continuing you agree to Constrade's{" "}
      <Pressable>
        <Text className="text-black">Terms & Conditions</Text>
      </Pressable>{" "}
      &{" "}
      <Pressable>
        <Text className="text-black">Privacy Policy</Text>
      </Pressable>
    </Text>
  );
}
