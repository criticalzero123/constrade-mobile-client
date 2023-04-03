import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { communityData } from "../../../service/discoverService";
import CommunityCard from "./CommunityCard";
import { getCommunityPopular } from "../../../redux/actions/homeActions";
import { useEffect } from "react";
import { useState } from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function SuggestedCommunities() {
  const { user } = useGetCurrentUser();
  const navigation = useNavigation();
  const [community, setCommunity] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getCommunityPopular(user.userId);

      setCommunity(res);
    };

    fetch();
  }, []);

  if (community === undefined)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  if (community && community.length > 0)
    return (
      <View className="w-full">
        <View className="px-5">
          <View className="flex-row justify-between ">
            <Text className="font-semibold text-lg">Suggested communities</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("HomeCommunityScreen", {
                  userId: user.userId,
                })
              }
            >
              <Text className="font-semibold text-lg text-[#CC481F]">
                See all
              </Text>
            </Pressable>
          </View>
          <Text className="w-4/6 text-gray-400 text-base my-2">
            Join a community now and meet new friends.
          </Text>
        </View>
        <FlatList
          data={community}
          renderItem={({ item, index }) => (
            <CommunityCard data={item} index={index} key={index} home={true} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
}

const styles = StyleSheet.create({});
