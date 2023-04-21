import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useSubscribe from "../../hooks/subscription/useSubscribe";
import { StackActions, useNavigation } from "@react-navigation/native";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
export default function SubscriptionScreen() {
  const { user } = useGetCurrentUser();
  const { subscribe, historyData, cancel, loading } = useSubscribe(user.userId);
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const onPressCancel = () => {
    Alert.alert(
      "Info",
      "Are you sure you want to cancel? This is not refundable.",
      [
        {
          text: "OK",
          onPress: async () => {
            const res = await cancel(user.userId);

            if (res) {
              Alert.alert("", "Cancel successfully!", [
                {
                  text: "OK",
                  onPress: () =>
                    navigation.dispatch(StackActions.replace("UserProfile")),
                },
              ]);
            }
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
        },
      ]
    );
  };

  const onPressSubscribe = async () => {
    const res = await subscribe(user.userId);

    if (res) {
      Alert.alert("", "Subscribe successfully!", [
        {
          text: "OK",
          onPress: () =>
            navigation.dispatch(StackActions.replace("UserProfile")),
        },
      ]);
    }
  };

  if (historyData === undefined)
    return (
      <ContainerSafeView>
        <HeaderArrow headerName={"Subscription"} />
        <View className="items-center justify-center flex-1">
          <ActivityIndicator />
        </View>
      </ContainerSafeView>
    );

  if (historyData.newSubscriptionType === "free")
    return (
      <ContainerSafeView styleName={"bg-white"}>
        <HeaderArrow headerName={"Subscription"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="items-center mx-10">
            <View className="p-7 bg-[#cc471f2c]" style={{ borderRadius: 15 }}>
              <MaterialCommunityIcons name="star-off" size={50} color="gray" />
              {/* <AntDesign name="star" size={50} color="black" /> */}
            </View>
            <Text className="capitalize font-semibold text-2xl mt-5 mb-2 text-gray-600">
              {historyData.newSubscriptionType} Subscription
            </Text>
            <Text className="text-center text-base text-gray-400">
              Access to all features be a premium member now.
            </Text>
          </View>

          <View
            className="bg-[#0F5799] mx-5 mt-10 p-2"
            style={{ height: height * 0.45, borderRadius: 10 }}
          >
            <View className="items-center mb-2">
              <Text className="font-semibold text-white">
                Be a subscriber now!
              </Text>
            </View>
            <View
              className="bg-[#fcfdff] p-2"
              style={{ height: height * 0.4, borderRadius: 10 }}
            >
              <View className="items-center">
                <Text className="text-base text-gray-400">For only</Text>
                <Text className="font-semibold text-[#CC481F] text-3xl mt-3 underline">
                  ₱100.00
                </Text>
              </View>
              <View className="flex-row items-center mt-5">
                <MaterialIcons name="double-arrow" size={24} color="#CC481F" />
                <Text className="ml-2 text-base text-[#627282]">
                  Good for 1 month.
                </Text>
              </View>
              <View className="flex-row items-center mt-5">
                <MaterialIcons name="double-arrow" size={24} color="#CC481F" />
                <Text className="ml-2 text-base text-[#627282]">
                  Discount boosting product
                </Text>
              </View>
              <View className="flex-row items-center mt-5">
                <MaterialIcons name="double-arrow" size={24} color="#CC481F" />
                <Text className="ml-2 text-base text-[#627282]">
                  Change user preferences
                </Text>
              </View>
              <View className="flex-row items-center mt-5">
                <MaterialIcons name="double-arrow" size={24} color="#CC481F" />
                <Text className="ml-2 text-base text-[#627282]">
                  Additional 10 post counts
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-1 justify-end mb-5">
            <Pressable
              className="bg-[#CC481F] p-4 "
              onPress={onPressSubscribe}
              style={{ borderRadius: 10 }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-center text-white font-semibold">
                  Subscribe
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </ContainerSafeView>
    );

  if (historyData.newSubscriptionType === "premium")
    return (
      <ContainerSafeView styleName={"bg-white"}>
        <HeaderArrow headerName={"Subscription"} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="items-center mx-10">
            <View className="p-7 bg-[#cc471f2c]" style={{ borderRadius: 15 }}>
              {/* <MaterialCommunityIcons name="star-off" size={50} color="gray" /> */}
              <AntDesign name="star" size={50} color="#FF6838" />
            </View>
            <Text className="capitalize font-bold text-2xl mt-5 mb-2 text-[#CC481F]">
              {historyData.newSubscriptionType} Member
            </Text>
          </View>

          <View
            className="bg-[#0F5799] mx-5 mt-10 p-2"
            style={{ height: height * 0.4, borderRadius: 10 }}
          >
            <View className="items-center mb-2">
              <Text className="font-semibold text-white">
                Glad to have you here!
              </Text>
            </View>
            <View
              className="bg-[#fcfdff] p-2"
              style={{ height: height * 0.35, borderRadius: 10 }}
            >
              <View className="flex-row items-center mt-6">
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={24}
                  color="green"
                />
                <Text className="ml-2 text-base text-[#627282]">
                  Good for 1 month.
                </Text>
              </View>
              <View className="flex-row items-center mt-5">
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={24}
                  color="green"
                />
                <Text className="ml-2 text-base text-[#627282]">
                  Discount boosting product
                </Text>
              </View>
              <View className="flex-row items-center mt-5">
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={24}
                  color="green"
                />
                <Text className="ml-2 text-base text-[#627282]">
                  Change user preferences
                </Text>
              </View>
              <View className="flex-row items-center mt-5">
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={24}
                  color="green"
                />
                <Text className="ml-2 text-base text-[#627282]">
                  Additional 10 post counts
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-1 justify-end mb-5">
            <Pressable
              className="border border-[#CC481F] p-4 "
              onPress={onPressCancel}
              style={{ borderRadius: 10 }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-center text-[#CC481F] font-semibold">
                  Cancel
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </ContainerSafeView>
    );
}

const styles = StyleSheet.create({});
