import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useNavigation } from "@react-navigation/native";
import CommunityHeader from "../../components/Community/CommunityHeader";

export default function Community() {
  const navigation = useNavigation();
  return (
    <View>
      <CommunityHeader />

      <Pressable onPress={() => navigation.navigate("MyCommunity")}>
        <Text>See all</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
