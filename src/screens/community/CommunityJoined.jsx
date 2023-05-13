import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CommunityEmpty from "../../components/Community/CommunityEmpty";
import useCommunityJoined from "../../hooks/community/useCommunityJoined";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import CommunityItem from "../../components/Community/CommunityItem";
import { useNavigation } from "@react-navigation/native";
import CommunityCard from "../../components/Home/CommunityCard";
export default function CommunityJoined() {
  const { user } = useGetCurrentUser();
  const [communities] = useCommunityJoined(user && user.userId);
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row my-5">
          <Text className=" font-semibold text-lg">JOINED COMMUNITIES </Text>
          {communities && communities.length !== 0 && (
            <Text className="ml-1 py-1 px-2 rounded-full bg-red-500 text-white">
              {communities.length}
            </Text>
          )}
        </View>

        {communities &&
          (communities.length === 0 ? (
            <CommunityEmpty from="created" />
          ) : (
            communities.map((community, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("CommunityDetail", {
                    id: community.communityId,
                  })
                }
                className="flex-row flex-wrap justify-center"
              >
                <CommunityCard
                  data={community}
                  currentUserId={user.userId}
                  fullWidth
                />
              </Pressable>
            ))
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
