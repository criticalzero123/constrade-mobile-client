import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserInfo from "../../components/User/UserInfo";
import { StatusBar } from "expo-status-bar";
import OtherUserInfoNav from "../../components/User/OtherUserInfoNav";
import OtherUserActions from "../../components/User/OtherUserActions";
import useGetUserById from "../../hooks/useGetUserById";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function OtherUserProfile({ route }) {
  // This is for the userId of other user
  const { userId } = route.params;

  const [data] = useGetUserById(userId);
  const { user } = useGetCurrentUser();

  const firstWordName = data && data.person.firstName.toString().split(" ")[0];

  return (
    <SafeAreaView className=" bg-[#242120]">
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        {data !== undefined && (
          <UserInfo
            headerName={`${firstWordName}'s profile`}
            shareable={false}
            data={data}
          />
        )}
        <View style={{ paddingHorizontal: 20 }}>
          <OtherUserActions
            otherUserId={data && data.user.userId}
            currentUserId={user && user.userId}
          />
          <OtherUserInfoNav />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
