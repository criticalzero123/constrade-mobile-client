import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useGetCommunity from "../../../hooks/community/useGetCommunity";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import useCommunity from "../../../hooks/community/useCommunity";
import { ReportEnum } from "../../../../service/enums";
import CommunityDiscussion from "../CommunityDiscussion/CommunityDiscussion";
import CommunityMember from "../CommunityMember/CommunityMember";
import { useHideBottomTab } from "../../../hooks/useHideBottomTab";
import { useNavigation } from "@react-navigation/native";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import { ActivityIndicator } from "react-native-paper";
const Tab = createMaterialTopTabNavigator();

export default function CommunityDetail({ route }) {
  useHideBottomTab();

  const { id } = route.params;
  const { data, currentMember, refresh } = useGetCommunity(id);
  const { deleteCommunityById, reportCommunityUser, join } = useCommunity();
  const { user } = useGetCurrentUser();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const onShowAction = () => {
    Alert.alert("", "Please Choose your Action", [
      {
        text: "Delete",
        onPress: () => deleteCommunityById(id, user.userId),
      },
      {
        text: "Update",
        onPress: () =>
          navigation.navigate("CommunityEdit", { data: data.community }),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const onReport = () => {
    const info = {
      reportedBy: user.userId,
      idReported: id,
      reportType: ReportEnum.Community,
      description: "Something description",
      dateSubmitted: new Date(),
    };
    reportCommunityUser(info);
  };

  const handleJoin = async () => {
    const res = await join(id, user.userId);
    const resLower = res.toString().toLowerCase();

    if (resLower === "pending") {
      alert("Pending now.");
    } else if (resLower === "approved") {
      refresh(user.userId);
    } else {
      alert("Rejected");
    }
  };

  if (data === undefined)
    return (
      <ContainerSafeView>
        <HeaderArrow headerName={"Community details"} />
        <View className="items-center justify-center flex-1">
          <ActivityIndicator />
        </View>
      </ContainerSafeView>
    );

  if (data) {
    return (
      <ContainerSafeView horizontalSpace={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <View
            style={{ paddingHorizontal: 20 }}
            className="flex-row items-center justify-between"
          >
            <HeaderArrow headerName={"Community details"} />
            {user.userId === data.community.ownerUserId ? (
              <Pressable className="border p-1 rounded" onPress={onShowAction}>
                <SimpleLineIcons name="options" size={12} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={onReport}>
                <Text>Report</Text>
              </Pressable>
            )}
          </View>
          <Image
            source={{ uri: data.community.imageUrl }}
            style={{ width: width, height: height * 0.15 }}
          />
          {currentMember ? (
            <View style={{ paddingHorizontal: 20 }} className="mt-5">
              <Text className="font-semibold text-lg">
                {data.community.name}
              </Text>

              <View className="flex-row items-center mt-4">
                <Octicons name="check" size={20} color="green" />
                <Text className="font-bold ml-2 text-green-700">Joined</Text>
              </View>
              <View className="flex-row items-center mt-4">
                <MaterialCommunityIcons
                  name="timer-outline"
                  size={20}
                  color="gray"
                />
                <Text className="ml-1 text-gray-500">
                  Member since{" "}
                  {new Date(currentMember.memberSince).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View style={{ paddingHorizontal: 20 }} className="mt-5">
                <Text className="font-semibold text-lg">
                  {data.community.name}
                </Text>

                <View className="flex-row mt-4 mb-2">
                  <View className="flex-row items-center">
                    <Entypo name="lock" size={20} color="silver" />

                    <Text className="capitalize ml-2">
                      {data.community.visibility} group
                    </Text>
                  </View>
                  <View className="flex-row item-center ml-10">
                    <Feather name="users" size={20} color="gray" />
                    <Text className="ml-2">{data.members.length} members</Text>
                  </View>
                </View>
                <View className="flex-row items-center my-4 justify-between ">
                  <View className="flex-row items-center ">
                    <Image
                      source={{ uri: data.owner.user.imageUrl }}
                      style={{
                        width: width * 0.08,
                        height: height * 0.04,
                        borderRadius: 100,
                      }}
                    />
                    <View className="ml-2">
                      <Text className="text-gray-400 ">Owner</Text>
                      <Text className="font-semibold capitalize text-base">
                        {data.owner.person.firstName}{" "}
                        {data.owner.person.lastName}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={34}
                    color="gray"
                  />
                </View>

                <Pressable
                  className="w-full items-center p-4 bg-[#D14519] rounded-lg"
                  onPress={handleJoin}
                >
                  <Text className="text-white font-semibold">Join group</Text>
                </Pressable>
                <View className="border-b border-gray-300 mt-8 mb-4" />
                <View>
                  <Text className="font-semibold text-base">
                    About this community
                  </Text>
                  <Text className="text-gray-400">
                    {data.community.description}
                  </Text>
                </View>
                <View className="flex-row items-center mt-4">
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={22}
                    color="gray"
                  />
                  <Text className="ml-1 text-gray-500">
                    Created{" "}
                    {new Date(data.community.dateCreated).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </>
          )}
          <Tab.Navigator
            style={{ height: height }}
            screenOptions={{
              tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
              tabBarStyle: {
                backgroundColor: "rgba(0,0,0,0)",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0,0,0,0.1)",
                shadowColor: "white",
              },
              tabBarInactiveTintColor: "rgba(0,0,0,0.3)",
              tabBarActiveTintColor: "black",
              tabBarIndicatorStyle: {
                backgroundColor: "rgba(0,0,0,0.65)",
                height: "4%",
                width: "40%",
                marginLeft: 20,
              },
            }}
          >
            <Tab.Screen
              name="CommunityDiscussion"
              component={CommunityDiscussion}
              options={{
                tabBarLabel: "Discussion",
                tabBarLabelStyle: {
                  textTransform: "capitalize",
                },
              }}
            />
            <Tab.Screen
              name="CommunityMember"
              component={CommunityMember}
              options={{
                tabBarLabel: "Members",
                tabBarLabelStyle: {
                  textTransform: "capitalize",
                },
              }}
            />
          </Tab.Navigator>
        </ScrollView>
      </ContainerSafeView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
