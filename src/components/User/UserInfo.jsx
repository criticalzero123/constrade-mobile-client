import {
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import backImage from "../../../assets/Discover/orange-scenery.jpg";
import { useNavigation } from "@react-navigation/native";
import useUserFollowAndFollowers from "../../hooks/useUserFollowAndFollowers";
import useUserReview from "../../hooks/useUserReview";

export default function UserInfo({ headerName, myProfile = true, data }) {
  const navigation = useNavigation();
  const [follow] = useUserFollowAndFollowers(data && data.user.userId);
  const [review] = useUserReview(data && data.user.userId);
  if (data === undefined) return;
  return (
    <View>
      <Image
        source={backImage}
        className="absolute w-full h-4/6"
        style={{ resizeMode: "cover" }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.35)", "rgba(36, 33, 32, 1)"]}
        className="w-full h-4/6 absolute"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      ></LinearGradient>

      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row justify-between mt-3 mb-4">
          <View className="flex-row">
            <Pressable
              onPress={() => navigation.reset({ routes: [{ name: "Menu" }] })}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text className="ml-2 text-lg font-semibold text-white capitalize">
              {headerName}
            </Text>
          </View>
          {myProfile && <AntDesign name="sharealt" size={21} color="white" />}
        </View>
        <View className="items-center">
          <View className=" items-center">
            <View className="p-1 border-2 border-[#FF6838] rounded-full items-center ">
              <Image
                source={{
                  uri: data.user.imageUrl,
                }}
                className="w-24 h-24 rounded-full"
              />
            </View>
            <Text className="text-white font-semibold px-4 py-1 rounded-2xl bg-[#FF6838] absolute bottom-0 uppercase">
              {data.user.userType}
            </Text>
          </View>

          <Text className="text-white font-semibold text-lg mt-4 capitalize">
            {data.person.firstName} {data.person.lastName}
          </Text>
          <Text className="text-gray-300 mt-1 mb-8">
            Somewhere in the middle, Cebu
          </Text>

          <View className="w-full flex-row justify-between p-5 rounded-md bg-[#508CC7]">
            <View className="items-center">
              <Text className="font-bold text-xl text-white">
                {follow === undefined ? (
                  <ActivityIndicator size="small" />
                ) : (
                  follow && follow.followedCount
                )}
              </Text>
              <Text className="mt-3 opacity-75 text-white">Followers</Text>
            </View>
            <View className="border-l border-[#F7FAFC26]"></View>
            <View className="items-center">
              <View className="flex-row items-center">
                <FontAwesome name="star" size={20} color="white" />
                <Text className="font-bold text-xl text-white ml-2">
                  {review !== undefined ? (
                    review
                  ) : (
                    <ActivityIndicator size="small" />
                  )}
                </Text>
              </View>
              <Text className="mt-3 opacity-75 text-white">Ratings</Text>
            </View>
            <View className="border-l border-[#F7FAFC26]"></View>
            <View className="items-center">
              <Text className="font-bold text-xl text-white">
                {follow === undefined ? (
                  <ActivityIndicator size="small" />
                ) : (
                  follow && follow.followCount
                )}
              </Text>
              <Text className="mt-3 opacity-75 text-white">Following</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
