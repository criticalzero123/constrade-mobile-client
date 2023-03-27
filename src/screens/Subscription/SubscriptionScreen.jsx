import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useSubscribe from "../../hooks/subscription/useSubscribe";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function SubscriptionScreen() {
  const { user } = useGetCurrentUser();
  const { subscribe, historyData, cancel } = useSubscribe(user.userId);
  const navigation = useNavigation();
  const onPressCancel = async () => {
    const res = await cancel(user.userId);

    if (res) {
      Alert.alert("", "Cancell successfully!", [
        {
          text: "OK",
          onPress: () =>
            navigation.dispatch(StackActions.replace("UserProfile")),
        },
      ]);
    } else {
      alert("Something went wrong in cancelling.");
    }
  };

  return (
    <ContainerSafeView>
      {historyData && (
        <>
          {historyData.newSubscriptionType === "premium" ? (
            <Pressable className="bg-gray-500 p-4" onPress={onPressCancel}>
              <Text className="text-center text-white">Cancel</Text>
            </Pressable>
          ) : (
            <Pressable
              className="bg-gray-500 p-4"
              onPress={() => subscribe(user.userId)}
            >
              <Text className="text-center text-white">Subscribe</Text>
            </Pressable>
          )}
          <View>
            <View>
              <Text>Current Subscription</Text>
              <Text>{historyData.newSubscriptionType}</Text>
              <Text>
                {new Date(historyData.newDateStart).toLocaleDateString()}
              </Text>
              <Text>
                {new Date(historyData.newDateStart).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </>
      )}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
