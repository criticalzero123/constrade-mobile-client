import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CommunityEmpty from "../../components/Community/CommunityEmpty";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useCommunity from "../../hooks/community/useCommunity";
import { useNavigation } from "@react-navigation/native";
import CommunityItem from "../../components/Community/CommunityItem";

export default function CommunityCreated() {
  const { user } = useGetCurrentUser();
  const { communityList } = useCommunity(user && user.userId);

  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-row my-5">
        <Text className=" font-semibold text-lg">CREATED COMMUNITIES </Text>
        {communityList && communityList.length !== 0 && (
          <Text className="ml-1 py-1 px-2 rounded-full bg-red-500 text-white">
            {communityList.length}
          </Text>
        )}
      </View>

      {communityList &&
        (communityList.length === 0 ? (
          <CommunityEmpty from="created" />
        ) : (
          communityList.map((community) => (
            <Pressable
              key={community.communityId}
              onPress={() =>
                navigation.navigate("CommunityDetail", {
                  id: community.communityId,
                })
              }
            >
              <CommunityItem details={community} />
            </Pressable>
          ))
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
