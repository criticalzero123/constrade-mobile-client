import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import NotificationItem from "../../components/Notification/NotificationItem";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Notification() {
  const navigation = useNavigation();
  return (
    <ContainerSafeView colorStatusBar="dark">
      <Pressable onPress={() => navigation.goBack()} className="mt-4">
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
      <View className="justify-between items-center flex-row mt-10">
        <Text className="text-2xl font-semibold">Notifications</Text>
        <Text className="text-[#CC481F] text-base">Mark all as read</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
        <NotificationItem />
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
