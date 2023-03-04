import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useSubscribe from "../../hooks/subscription/useSubscribe";

export default function SubscriptionScreen() {
  const { user } = useGetCurrentUser();
  const { subscribe, historyData } = useSubscribe(user.userId);

  return (
    <ContainerSafeView>
      <Pressable
        className="bg-gray-500 p-4"
        onPress={() => subscribe(user.userId)}
      >
        <Text className="text-center text-white">Subscribe</Text>
      </Pressable>
      {historyData && (
        <View>
          <View>
            <Text>Current Subscription</Text>
            <Text>{historyData.newSubscription}</Text>
            <Text>
              {new Date(historyData.newDateStart).toLocaleDateString()}
            </Text>
            <Text>
              {new Date(historyData.newDateStart).toLocaleTimeString()}
            </Text>
          </View>
          <View className="mt-10">
            <Text>Past Subscription</Text>
            <Text>{historyData.previousSubscription}</Text>
            <Text>
              {new Date(historyData.previousDateStart).toLocaleDateString()}
            </Text>
            <Text>
              {new Date(historyData.previousDateStart).toLocaleTimeString()}
            </Text>
          </View>
        </View>
      )}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
