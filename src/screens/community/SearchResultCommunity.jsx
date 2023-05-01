import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useSearchCommunity from "../../hooks/community/useSearchCommunity";
import CommunityItem from "../../components/Community/CommunityItem";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CommunityCard from "../../components/Home/CommunityCard";

export default function SearchResultCommunity({ route }) {
  const { query } = route.params;
  const { user } = useGetCurrentUser();
  const [result] = useSearchCommunity(query, parseInt(user.userId));
  const navigation = useNavigation();
  if (result === undefined)
    return (
      <ContainerSafeView styleName="flex-row items-center justify-center">
        <ActivityIndicator />
      </ContainerSafeView>
    );

  if (result.length === 0)
    return (
      <ContainerSafeView>
        <HeaderArrow headerName={"Search results"} />
        <Text>
          No <Text className="font-semibold">{query}</Text> is found at
          community
        </Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView styleName={"bg-white"}>
      <HeaderArrow headerName={"Search results"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {result.map((community, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("CommunityDetail", {
                id: community.communityId,
              })
            }
          >
            <CommunityCard
              data={community}
              fullWidth
              key={index}
              currentUserId={user.userId}
            />
          </Pressable>
        ))}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
