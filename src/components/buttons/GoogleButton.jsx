import { Text, Pressable, View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { useGoogleAuthAction } from "../../hooks/useGoogleAuthAction";
import { useState } from "react";

export default function GoogleButton({ text, type }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [request, promptAsync, userInfo] = useGoogleAuth();
  const { user, token, apiKey } = useGoogleAuthAction(userInfo, type);

  useEffect(() => {
    if (user !== undefined) {
      navigation.navigate("WelcomeUser", {
        from: type,
        user: user,
        token: token,
        apiKey: apiKey,
      });
    }
  }, [user]);

  const handleOnPress = () => {
    setLoading(true);
    promptAsync();
  };

  return (
    <Pressable onPress={handleOnPress} disabled={!request}>
      <View
        className={` rounded py-4 flex-row min-w-full justify-center items-center ${
          type === "signin" ? "bg-[#CC481F] " : "border border-[#CC481F]"
        }`}
      >
        <AntDesign
          name="google"
          size={24}
          color={`${type === "signin" ? "white" : "#CC481F"}`}
        />
        <View className="mx-1"></View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            className={`${
              type === "signin" ? "text-white" : "text-[#CC481F]"
            } text-base font-semibold`}
          >
            {text}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
