import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getDateTime } from "../../../service/dateService";

export default function RecentTransactionItem({ data, currentUserWalletId }) {
  const Sender = () => {
    return (
      <View className="justify-between flex-row items-center">
        <View>
          <Text className="text-base mb-1">Send Money</Text>
          <Text className="text-md opacity-50">
            {getDateTime(data.dateSend)}
          </Text>
        </View>
        <Text className="text-red-500 font-semibold">
          - ₱ {data.amount.toFixed(2)}
        </Text>
      </View>
    );
  };

  const Receiver = () => {
    return (
      <View className="justify-between flex-row items-center my-2">
        <View>
          <Text className="text-base mb-1">Received Money</Text>
          <Text className="text-md opacity-50">
            {getDateTime(data.dateSend)}
          </Text>
        </View>
        <Text className="text-green-500 font-semibold">
          + ₱ {data.amount.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View>
      {data.senderWalletId === currentUserWalletId ? <Sender /> : <Receiver />}
    </View>
  );
}

const styles = StyleSheet.create({});
