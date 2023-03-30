import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserInfo from "../../components/User/UserInfo";
import { StatusBar } from "expo-status-bar";
import OtherUserInfoNav from "../../components/User/OtherUserInfoNav";
import OtherUserActions from "../../components/User/OtherUserActions";
import useGetUserById from "../../hooks/useGetUserById";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
export default function OtherUserProfile({ route }) {
  // This is for the userId of other user
  const { userId } = route.params;

  const [data] = useGetUserById(userId);
  const { user } = useGetCurrentUser();
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      navigation.reset({ routes: [{ name: "Menu" }] });
    };
  }, [userId]);

  const firstWordName = data && data.person.firstName.toString().split(" ")[0];

  if (data === undefined)
    return (
      <ContainerSafeView styleName="flex-row justify-center items-center">
        <ActivityIndicator />
      </ContainerSafeView>
    );

  return (
    <SafeAreaView className=" bg-[#242120]">
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        {data !== undefined && (
          <UserInfo
            headerName={`${firstWordName}'s profile`}
            myProfile={false}
            data={data}
          />
        )}
        <View style={{ paddingHorizontal: 20 }}>
          <OtherUserActions
            otherUser={data !== undefined && data.user}
            currentUserId={user && user.userId}
          />
          <OtherUserInfoNav data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
