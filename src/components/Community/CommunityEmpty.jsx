import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import picture from "../../../assets/community/guys_playing.png";
import { useNavigation } from "@react-navigation/native";

export default function CommunityEmpty({ from }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const createdText = {
    title: "This place is empty",
    description:
      "You haven't created your own community yet. Create now and let others join you!",
  };

  const joinedText = {
    title: "You're all alone",
    description:
      "You haven't joined any communities yet. Browse now or maybe create a new one!",
  };
  return (
    <View className="h-full justify-center items-center px-8 ">
      <Image
        className="w-full"
        style={{ resizeMode: "contain", height: height * 0.15 }}
        source={picture}
      />
      <Text className="font-semibold text-lg mt-4 mb-2">
        {from === "created" ? createdText.title : joinedText.title}
      </Text>
      <Text className="text-center text-gray-500 leading-5">
        {from === "created" ? createdText.description : joinedText.description}
      </Text>

      {from === "created" && (
        <Pressable
          className="px-10 py-4 bg-[#CC481F] rounded my-6"
          onPress={() => navigation.navigate("AddCommunity")}
        >
          <Text className="text-white font-semibold">Create my community</Text>
        </Pressable>
      )}
      <Pressable className=" my-4">
        <Text className="text-[#CC481F]">Browse communities</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
