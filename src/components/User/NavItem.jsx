import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function NavItem({
  iconNav,
  title,
  description,
  arrowVisible = true,
}) {
  return (
    <Pressable onPress={() => alert(title)}>
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-row items-center">
          {iconNav}
          <View className="ml-2">
            <Text className="text-[#FCFBFA] font-semibold">{title}</Text>
            <Text
              className={`text-[#FCFBFA] opacity-75 ${
                description ? "block" : "hidden"
              }`}
            >
              {description}
            </Text>
          </View>
        </View>
        {arrowVisible && (
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
