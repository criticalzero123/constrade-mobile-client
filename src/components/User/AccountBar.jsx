import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import NavItem from "./NavItem";
import { useNavigation } from "@react-navigation/native";

export default function AccountBar({ data }) {
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
        onPress={() => navigation.navigate("UserProfileEdit", { data: data })}
      />

      <NavItem
        iconNav={
          <Feather
            name="user-check"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Verify Account"
        onPress={() => navigation.navigate("Verification", { data: data })}
      />

      <NavItem
        iconNav={
          <Ionicons
            name="stats-chart-sharp"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Trade Statistics"
        onPress={() => navigation.navigate("UserStatistics")}
      />

      <NavItem
        style={{ opacity: 0.75 }}
        iconNav={
          <MaterialIcons
            name="post-add"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Add Count Post"
        onPress={() => navigation.navigate("AddCountPost", { data: data })}
      />
      <NavItem
        style={{ opacity: 0.75 }}
        iconNav={
          <Ionicons
            name="wallet-outline"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Wallet"
        onPress={() => navigation.navigate("Wallet", { data: data })}
      />

      <NavItem
        iconNav={
          <MaterialIcons
            name="verified-user"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Subscription"
        onPress={() => navigation.navigate("Subscription")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
