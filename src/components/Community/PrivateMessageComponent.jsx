import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import pic from "../../../assets/community/private_pic.png";

export default function PrivateMessageComponent({ text }) {
  const { height, width } = useWindowDimensions();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="pt-5 bg-white h-screen items-center">
        <Image
          style={{
            height: height * 0.2,
            width: width * 0.8,
            resizeMode: "contain",
          }}
          source={pic}
        />
        <Text className="text-center font-semibold text-base">
          {text} has been set to private
        </Text>
        <Text className="text-center px-10 mt-2 text-gray-400">
          The community organizers does not allow non-members to access the{" "}
          {text}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
