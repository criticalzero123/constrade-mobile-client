import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import NavItem from "./NavItem";

import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OtherUserInfoNav({ data }) {
  const navigation = useNavigation();

  return (
    <View className="">
      <Text className="text-[#FCFBFA] opacity-75 mt-6 mb-4">
        Items and Transactions
      </Text>
      <View>
        <NavItem
          iconNav={
            <Feather
              name="shopping-bag"
              size={24}
              color="white"
              style={{ opacity: 0.75 }}
            />
          }
          title="Item listing"
          onPress={() =>
            navigation.navigate("MyListing", {
              user: data.user,
              person: data.person,
            })
          }
        />
        <NavItem
          title={"Communities"}
          iconNav={
            <FontAwesome5
              name="users"
              size={18}
              color="white"
              style={{ opacity: 0.75 }}
            />
          }
        />

        <NavItem
          title={"Reviews & Feedbacks"}
          iconNav={
            <Octicons
              name="star"
              size={24}
              color="white"
              style={{ opacity: 0.75 }}
            />
          }
        />

        <Pressable className="flex-row items-center w-full">
          <MaterialIcons
            name="report"
            size={24}
            color="#FF6838"
            style={{ opacity: 0.75 }}
          />
          <Text className="ml-1 text-[#FF6838] font-semibold">
            Report Mike Andrew
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
