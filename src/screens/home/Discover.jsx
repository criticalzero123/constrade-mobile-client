import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import DiscoverHeader from "../../components/Home/DiscoverHeader";
import FlatListCategories from "../../components/Home/FlatListCategories";
import JustForYou from "../../components/Home/JustForYou";
import FeaturesList from "../../components/Home/FeaturesList";
import Advertisement from "../../components/Home/Advertisement";
import PeopleFollowedPost from "../../components/Home/PeopleFollowedPost";
import DealsNearYou from "../../components/Home/DealsNearYou";
import SuggestedCommunities from "../../components/Home/SuggestedCommunities";
import MightLikeThese from "../../components/Home/MightLikeThese";
import RecentlyViewed from "../../components/Home/RecentlyViewed";
import EndMessage from "../../components/EndMessage/EndMessage";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/userActions";
import { useNavigation } from "@react-navigation/native";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
export default function Discover() {
  const { data } = useSelector((state) => state.getAllUsersReducer);
  const { user } = useGetCurrentUser();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <DiscoverHeader />
          <View>
            {/* For search make an another component for this */}

            {data &&
              data.map((otherUser) =>
                user.userId === otherUser.userId ? (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("User", {
                        screen: "UserProfile",
                      })
                    }
                  >
                    <Text>{otherUser.email}</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("User", {
                        screen: "OtherUserProfile",
                        params: { userId: otherUser.userId },
                      })
                    }
                  >
                    <Text>{otherUser.email}</Text>
                  </Pressable>
                )
              )}

            <View
              className="py-4 px-2 rounded-lg bg-gray-300 mt-4 mb-3"
              style={{ marginHorizontal: 20 }}
            >
              <Text>Search</Text>
            </View>

            <FeaturesList />

            <View className="my-2" />
            <FlatListCategories />

            <View className="my-2" />
            <JustForYou />

            <View className="my-4" />
            <Advertisement />

            <View className="my-3" />
            <PeopleFollowedPost />

            <View className="my-2" />
            <DealsNearYou />

            <View className="my-2" />
            <SuggestedCommunities />

            <View className="my-3" />
            <MightLikeThese />

            <View className="my-2" />
            <RecentlyViewed />

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
