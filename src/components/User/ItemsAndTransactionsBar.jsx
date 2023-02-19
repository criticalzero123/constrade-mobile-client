import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavItem from "./NavItem";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ItemsAndTransactionsBar() {
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
        description="What other traders say about you"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
