import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommunityEmpty from "../../components/Community/CommunityEmpty";

export default function CommunityCreated() {
  return (
    <View>
      <CommunityEmpty from="created" />
    </View>
  );
}

const styles = StyleSheet.create({});
