import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavItem from "./NavItem";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";

export default function ItemsAndTransactionsBar({ data }) {
  const navigation = useNavigation();
  return (
    <View className="mt-6">
      <Text className="text-[#FCFBFA] opacity-75 mb-3">
        Items and Transactions
      </Text>
      <NavItem
        iconNav={
          <Feather
            name="shopping-bag"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="My listings"
        description="Manage your listed items"
        onPress={() =>
          navigation.navigate("MyListing", {
            user: data.user,
            person: data.person,
          })
        }
      />

      <NavItem
        iconNav={
          <AntDesign
            name="hearto"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        onPress={() => navigation.navigate("WishList")}
        title="Wishlist"
      />

      <NavItem
        iconNav={
          <AntDesign
            name="staro"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="Reviews & Feedbacks"
        onPress={() => navigation.navigate("Reviews", { user: data.user })}
        description="What other traders say about you"
      />

      <NavItem
        iconNav={
          <Octicons
            name="arrow-switch"
            size={24}
            color="white"
            style={{ opacity: 0.75, marginRight: 5 }}
          />
        }
        title="Transactions"
        onPress={() =>
          navigation.navigate("TransactionAll", { user: data.user })
        }
        description="See all your item transactions"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
