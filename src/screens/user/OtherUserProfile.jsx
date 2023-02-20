import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserInfo from "../../components/User/UserInfo";
import { StatusBar } from "expo-status-bar";
import OtherUserInfoNav from "../../components/User/OtherUserInfoNav";
import OtherUserActions from "../../components/User/OtherUserActions";

export default function OtherUserProfile() {
  return (
    <SafeAreaView className=" bg-[#242120]">
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <UserInfo headerName="Mike's Profile" shareable={false} />
        <View style={{ paddingHorizontal: 20 }}>
          <OtherUserActions />
          <OtherUserInfoNav />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
