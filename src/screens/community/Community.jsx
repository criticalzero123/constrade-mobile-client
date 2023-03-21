import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CommunityHeader from "../../components/Community/CommunityHeader";
import { useState } from "react";
import CommunityFeatureItem from "../../components/Community/CommunityFeatureItem";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useCommunityJoined from "../../hooks/community/useCommunityJoined";
import CommunityCard from "../../components/Home/CommunityCard";
import usePopularCommunity from "../../hooks/community/usePopularCommunity";

export default function Community() {
  const navigation = useNavigation();
  const [searchQ, setSearchQ] = useState("");

  const { user } = useGetCurrentUser();
  const [joined] = useCommunityJoined(user && user.userId);
  const [suggested] = usePopularCommunity(user && user.userId);
  return (
    <ScrollView className="bg-white h-full">
      <CommunityHeader />

      <View style={{ paddingHorizontal: 20 }}>
        <TextInput
          className="bg-gray-100 py-3 px-4 rounded mb-5"
          value={searchQ}
          onChangeText={setSearchQ}
          placeholder="Find Communities"
        />

        <CommunityFeatureItem />
      </View>
      <View>
        <View
          className="flex-row justify-between my-5"
          style={{ paddingHorizontal: 20 }}
        >
          <View>
            <Text className="font-bold text-lg">My Communities</Text>
            <Text className="text-gray-400">
              See all communities you joined and created.
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("MyCommunity")}>
            <Text className="text-[#FF6838] font-semibold">See all</Text>
          </Pressable>
        </View>
        {joined &&
          (joined.length === 0 ? (
            <View style={{ paddingHorizontal: 20 }} className="items-center">
              <Text className="text-[#627282]">
                You haven't joined any communities yet.
              </Text>
              <Text className="text-[#627282]">
                Browse now or maybe create a new one!
              </Text>
            </View>
          ) : (
            <FlatList
              data={joined}
              renderItem={({ item, index }) => (
                <CommunityCard
                  data={item}
                  index={index}
                  currentUserId={user.userId}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ))}
      </View>
      {console.log(suggested)}
      <View className="mt-8">
        {suggested && suggested.length !== 0 && (
          <>
            <View style={{ paddingHorizontal: 20 }}>
              <Text className="font-semibold mb-4 text-lg">
                Popular Communities
              </Text>
            </View>
            <FlatList
              data={suggested}
              renderItem={({ item, index }) => (
                <CommunityCard
                  data={item}
                  index={index}
                  currentUserId={user.userId}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
