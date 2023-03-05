import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import CommunityEmpty from "../../components/Community/CommunityEmpty";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useCommunity from "../../hooks/community/useCommunity";
import { useNavigation } from "@react-navigation/native";

export default function CommunityCreated() {
  const { user } = useGetCurrentUser();
  const { communityList } = useCommunity(user.userId);

  const navigation = useNavigation();
  return (
    <View>
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
              <Text>{community.name}</Text>
            </Pressable>
          ))
        ))}
    </View>
  );
}

const styles = StyleSheet.create({});
