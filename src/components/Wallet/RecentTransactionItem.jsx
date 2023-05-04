import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getDateTime } from "../../../service/dateService";
import { OtherTransactionType } from "../../../service/enums";
import BottomModal from "../modal/BottomModal";
import { useState } from "react";

export default function RecentTransactionItem({ data, currentUserWalletId }) {
  const [showOtherTransac, setShowOtherTransac] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [showReceiveMoney, setShowReceiveMoney] = useState(false);

  const Sender = () => {
    return (
      <Pressable
        className="justify-between flex-row items-center my-2"
        onPress={() => setShowSendMoney(true)}
      >
        <View>
          <Text className="text-base mb-1">Send Money</Text>
          <Text className="text-md opacity-50">{getDateTime(data.date)}</Text>
        </View>
        <Text className="text-red-500 font-semibold">
          - ₱ {data.amount.toFixed(2)}
        </Text>
      </Pressable>
    );
  };

  const Receiver = () => {
    return (
      <Pressable
        className="justify-between flex-row items-center my-2"
        onPress={() => setShowReceiveMoney(true)}
      >
        <View>
          <Text className="text-base mb-1">Received Money</Text>
          <Text className="text-md opacity-50">{getDateTime(data.date)}</Text>
        </View>
        <Text className="text-green-500 font-semibold">
          + ₱ {data.amount.toFixed(2)}
        </Text>
      </Pressable>
    );
  };

  const getType = () => {
    switch (data.transactionType) {
      case OtherTransactionType.Boost:
        return "Product Boost";
      case OtherTransactionType.Subscribe:
        return "Subscribe";
      case OtherTransactionType.Topup:
        return "Topup";
      case OtherTransactionType.Refund:
        return "Refund";
      case OtherTransactionType.AddCount:
        return "Add Post Count";
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
      case OtherTransactionType.Refund:
        return true;
      case OtherTransactionType.AddCount:
        return false;
    }
  };

  const Other = () => {
    return (
      <Pressable
        className="justify-between flex-row items-center my-2"
        onPress={() => setShowOtherTransac(true)}
      >
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
      </Pressable>
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

      <BottomModal
        isVisible={showReceiveMoney}
        setIsVisible={setShowReceiveMoney}
      >
        <Text className="text-2xl font-semibold mb-5">Transaction Details</Text>
        <Text className="text-lg">
          Reference No.: {data.sendMoneyTransactionId}
        </Text>
        <View>
          <View>
            <Text className="text-base mb-1">
              Received Money from wallet id: {data.senderWalletId}
            </Text>
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
      </BottomModal>

      <BottomModal isVisible={showSendMoney} setIsVisible={setShowSendMoney}>
        <Text className="text-2xl font-semibold mb-5">Transaction Details</Text>
        <Text className="text-lg">
          Reference No.: {data.sendMoneyTransactionId}
        </Text>
        <View>
          <View>
            <Text className="text-base mb-1">
              Send Money to wallet id: {data.receiverWalletId}
            </Text>
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
      </BottomModal>

      <BottomModal
        isVisible={showOtherTransac}
        setIsVisible={setShowOtherTransac}
      >
        <Text className="text-2xl font-semibold mb-5">Transaction Details</Text>
        <Text className="text-lg">
          Reference No.: {data.otherTransactionId}
        </Text>
        <View>
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
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({});
