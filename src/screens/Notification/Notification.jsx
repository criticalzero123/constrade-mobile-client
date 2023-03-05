import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import NotificationItem from "../../components/Notification/NotificationItem";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useNotification from "../../hooks/notification/useNotification";
import MessageEmpty from "../../components/messages/MessageEmpty";

export default function Notification() {
  const navigation = useNavigation();
  const { user } = useGetCurrentUser();
  const [notifications] = useNotification(user.userId);

  return (
    <ContainerSafeView colorStatusBar="dark">
      <Pressable onPress={() => navigation.goBack()} className="mt-4">
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
      <View className="justify-between items-center flex-row mt-10">
        <Text className="text-2xl font-semibold">Notifications</Text>
        {/* <Text className="text-[#CC481F] text-base">Mark all as read</Text> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
        {notifications &&
          (notifications.length === 0 ? (
            <MessageEmpty title="No notifications" ads={false} />
          ) : (
            notifications.map((item) => <NotificationItem item={item} />)
          ))}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
