import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useSignOutUser } from "../../hooks/useSignOutUser";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import UserInfo from "../../components/User/UserInfo";
import ItemsAndTransactionsBar from "../../components/User/ItemsAndTransactionsBar";
import AccountBar from "../../components/User/AccountBar";
import { StatusBar } from "expo-status-bar";
import PrivacyAndHelp from "../../components/User/PrivacyAndHelp";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function UserProfile() {
  const [onSignOut] = useSignOutUser();
  const navigation = useNavigation();

  return (
    <ContainerSafeView styleName="h-screen bg-[#242120]">
      {/* <StatusBar style="light" /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between mt-3">
          <View className="flex-row">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text className="ml-2 text-lg font-semibold text-white">
              My Profile
            </Text>
          </View>
          <AntDesign name="sharealt" size={21} color="white" />
        </View>

        <UserInfo />
        <ItemsAndTransactionsBar />
        <AccountBar />
        <PrivacyAndHelp />

        <Pressable
          onPress={onSignOut}
          className="justify-center w-full mb-5 mt-5 bg-[#F76363] rounded-lg p-4 flex-row items-center"
        >
          <MaterialCommunityIcons name="logout" size={24} color="white" />
          <Text className="font-semibold ml-1 text-white">Logout account</Text>
        </Pressable>
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
