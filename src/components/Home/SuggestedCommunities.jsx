import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { communityData } from "../../../service/discoverService";
import CommunityCard from "./CommunityCard";
import { getCommunityPopular } from "../../../redux/actions/homeActions";
import { useEffect } from "react";
import { useState } from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function SuggestedCommunities() {
  const { user } = useGetCurrentUser();
  const [community, setCommunity] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getCommunityPopular(user.userId);

      setCommunity(res);
    };

    fetch();
  }, []);
  if (community)
    return (
      <View className="w-full">
        <View className="px-5">
          <View className="flex-row justify-between ">
            <Text className="font-semibold text-lg">Suggested communities</Text>
            <Text className="font-semibold text-lg text-[#CC481F]">
              See all
            </Text>
          </View>
          <Text className="w-4/6 text-gray-400 text-base my-2">
            Join a community now and meet new friends.
          </Text>
        </View>
        <FlatList
          data={community}
          renderItem={({ item, index }) => (
            <CommunityCard data={item} index={index} key={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
}

const styles = StyleSheet.create({});
