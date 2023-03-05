import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavItem from "./NavItem";

import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PrivacyAndHelp() {
  const navigation = useNavigation();
  return (
    <View className="mt-4">
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
        onPress={() => navigation.navigate("HelpCenter")}
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
