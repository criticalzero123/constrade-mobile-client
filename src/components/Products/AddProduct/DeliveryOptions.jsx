import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function DeliveryOptions({ setMethod, method }) {
  return (
    <RadioButton.Group onValueChange={setMethod} value={method}>
      <View className="flex-row items-center justify-between mb-5 ">
        <View className="flex-row">
          <MaterialCommunityIcons
            name="handshake-outline"
            size={24}
            color="gray"
          />
          <View className="ml-2">
            <Text className="font-semibold mb-1">Meetup</Text>
            <Text className="text-gray-400">Meetup in a specific Location</Text>
          </View>
        </View>
        <RadioButton value="meetup" />
      </View>

      <View className="flex-row items-center justify-between mb-5 ">
        <View className="flex-row">
          <MaterialIcons name="delivery-dining" size={24} color="gray" />
          <View className="ml-2">
            <Text className="font-semibold mb-1">Deliver</Text>
            <Text className="text-gray-400">
              Deliver through 3rd-party apps.
            </Text>
          </View>
        </View>
        <RadioButton value="deliver" />
      </View>
    </RadioButton.Group>
  );
}

const styles = StyleSheet.create({});
