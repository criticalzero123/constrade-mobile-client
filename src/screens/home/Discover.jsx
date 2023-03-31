import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import DiscoverHeader from "../../components/Home/DiscoverHeader";
import FlatListCategories from "../../components/Home/FlatListCategories";
import JustForYou from "../../components/Home/JustForYou";
import FeaturesList from "../../components/Home/FeaturesList";
import Advertisement from "../../components/Home/Advertisement";
import SuggestedCommunities from "../../components/Home/SuggestedCommunities";
import MightLikeThese from "../../components/Home/MightLikeThese";
import EndMessage from "../../components/EndMessage/EndMessage";
import { Ionicons } from "@expo/vector-icons";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Discover() {
  const { user } = useGetCurrentUser();
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  if (user === undefined)
    return (
      <View className="flex-row justify-center items-center flex-1">
        <ActivityIndicator />
      </View>
    );

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <DiscoverHeader />

          <View>
            <View
              className="py-4 px-4 rounded-lg bg-gray-200 mt-4 mb-3 flex-row items-center"
              style={{ marginHorizontal: 20 }}
            >
              {search.trim() === "" && (
                <Ionicons name="search-sharp" size={24} color="#CC481F" />
              )}
              <TextInput
                value={search}
                onChangeText={setSearch}
                className={`${search.trim() === "" && "ml-2 "} text-base `}
                placeholder="Find console games"
                onSubmitEditing={() => {
                  setSearch("");
                  navigation.navigate("SearchResult", { query: search });
                }}
              />
            </View>

            <FeaturesList />
            <View className="my-3" />
            <MightLikeThese />

            <View className="my-2" />
            <FlatListCategories />

            <View className="my-2" />
            <JustForYou />

            <View className="my-4" />
            <Advertisement />

            <View className="my-2" />
            <SuggestedCommunities />

            <EndMessage
              text={
                "That's what we have for now. Maybe come back later for more awesome items!"
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
