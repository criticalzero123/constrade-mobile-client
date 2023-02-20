import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

import Advertisement from "../Home/Advertisement";

import upperImage from "../../../assets/Messages/upper_image.png";
import { useNavigation } from "@react-navigation/native";

export default function MessageEmpty({ title, description }) {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View className="w-full h-full">
      <Advertisement noPadding={true} />
      <View
        className="items-center justify-center px-4"
        style={{ height: height / 2 }}
      >
        <Image
          source={upperImage}
          className="w-full h-20"
          style={{ resizeMode: "contain" }}
        />
        <Text
          className="mt-6 text-center text-xl font-bold"
          onPress={() => navigation.navigate("PersonalMessage")}
        >
          {title}
        </Text>
        <Text className="mt-2 text-center leading-5 text-gray-500">
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
