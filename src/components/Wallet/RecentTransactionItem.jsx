import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getDateTime } from "../../../service/dateService";
import { OtherTransactionType } from "../../../service/enums";

export default function RecentTransactionItem({ data, currentUserWalletId }) {
  const Sender = () => {
    return (
      <View className="justify-between flex-row items-center my-2">
        <View>
          <Text className="text-base mb-1">Send Money</Text>
          <Text className="text-md opacity-50">{getDateTime(data.date)}</Text>
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
          <Text className="text-md opacity-50">{getDateTime(data.date)}</Text>
        </View>
        <Text className="text-green-500 font-semibold">
          + ₱ {data.amount.toFixed(2)}
        </Text>
      </View>
    );
  };

  const getType = () => {
    switch (data.transactionType) {
      case OtherTransactionType.Boost:
        return "Boost";
      case OtherTransactionType.Subscribe:
        return "Subscribe";
      case OtherTransactionType.Topup:
        return "Topup";
    }
  };

  const getTypeSign = () => {
    switch (data.transactionType) {
      case OtherTransactionType.Boost:
        return false;
      case OtherTransactionType.Subscribe:
        return false;
      case OtherTransactionType.Topup:
        return true;
    }
  };

  const Other = () => {
    return (
      <View className="justify-between flex-row items-center my-2">
        <View>
          <Text className="text-base mb-1">{getType()}</Text>
          <Text className="text-md opacity-50">{getDateTime(data.date)}</Text>
        </View>
        <Text
          className={`${
            getTypeSign() ? "text-green-500  " : "text-red-500 "
          } font-semibold`}
        >
          {getTypeSign() ? "+" : "-"} ₱ {data.amount.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View>
      {data.otherTransactionId !== undefined ? (
        <Other />
      ) : data.senderWalletId === currentUserWalletId ? (
        <Sender />
      ) : (
        <Receiver />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
