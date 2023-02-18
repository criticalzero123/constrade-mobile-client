import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavItem from "./NavItem";

import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PrivacyAndHelp() {
  return (
    <View className="mt-3">
      <Text className="text-[#FCFBFA] opacity-75 mb-3">Privacy & Help</Text>
      <NavItem
        iconNav={
          <SimpleLineIcons
            name="flag"
            size={22}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        arrowVisible={false}
        title="Help center"
      />

      <NavItem
        iconNav={
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color="white"
            style={{ opacity: 0.75 }}
          />
        }
        title="About"
        arrowVisible={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
