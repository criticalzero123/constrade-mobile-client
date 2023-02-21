import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import NavItem from "./NavItem";
import { useNavigation } from "@react-navigation/native";

export default function AccountBar({ user }) {
  const navigation = useNavigation();
  return (
    <View className="mt-4">
      <Text className="text-[#FCFBFA] opacity-75 mb-3">Account</Text>
      <NavItem
        iconNav={
          <Feather
            name="user"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Profile"
        description="Manage your profile"
        onPress={() => navigation.navigate("UserProfileEdit", { user })}
      />

      <NavItem
        iconNav={
          <Ionicons
            name="md-notifications-outline"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Notifications"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
