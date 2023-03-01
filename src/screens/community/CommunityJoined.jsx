import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommunityEmpty from "../../components/Community/CommunityEmpty";

export default function CommunityJoined() {
  return (
    <View>
      <CommunityEmpty from="joined" />
    </View>
  );
}

const styles = StyleSheet.create({});
