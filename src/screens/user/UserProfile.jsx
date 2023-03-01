import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { useSignOutUser } from "../../hooks/useSignOutUser";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import UserInfo from "../../components/User/UserInfo";
import ItemsAndTransactionsBar from "../../components/User/ItemsAndTransactionsBar";
import AccountBar from "../../components/User/AccountBar";
import { StatusBar } from "expo-status-bar";
import PrivacyAndHelp from "../../components/User/PrivacyAndHelp";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const [onSignOut] = useSignOutUser();

  const { user } = useSelector((state) => state.userInfoReducer);

  return (
    <SafeAreaView className=" bg-[#242120]">
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <UserInfo headerName="My Profile" data={user} />
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <ItemsAndTransactionsBar data={user} />
          <AccountBar data={user} />
          <PrivacyAndHelp />

          <Pressable
            onPress={onSignOut}
            className="justify-center w-full mb-5 mt-5 bg-[#F76363] rounded-lg p-4 flex-row items-center"
          >
            <MaterialCommunityIcons name="logout" size={24} color="white" />
            <Text className="font-semibold ml-1 text-white">
              Logout account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
