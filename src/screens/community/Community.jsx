import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CommunityHeader from "../../components/Community/CommunityHeader";
import useGetAllCommunity from "../../hooks/community/useGetAllCommunity";

export default function Community() {
  const navigation = useNavigation();

  const [data] = useGetAllCommunity();

  return (
    <ScrollView className="bg-white h-full">
      <CommunityHeader />

      <Pressable onPress={() => navigation.navigate("MyCommunity")}>
        <Text>See all</Text>
      </Pressable>

      {data && (
        <View>
          {data.map((_c) => (
            <Pressable
              onPress={() =>
                navigation.navigate("CommunityDetail", { id: _c.communityId })
              }
            >
              <Text>{_c.name}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
