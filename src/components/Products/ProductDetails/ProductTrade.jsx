import { Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import useGetProductId from "../../../hooks/Product/useGetProductId";

export default function ProductTrade() {
  const { data } = useGetProductId();
  const CashComponent = () => {
    return (
      <View className="flex-row">
        <Feather name="link-2" size={20} color="gray" />
        <View className="ml-2">
          <Text className="capitalize font-semibold text-gray-500 text-base">
            Cash
          </Text>
          <Text className="capitalize font-semibold text-base my-1">
            ₱ {data.product.cash}
          </Text>
        </View>
      </View>
    );
  };

  const SwapComponent = () => {
    return (
      <View className="flex-row">
        <Feather name="link-2" size={20} color="gray" />
        <View className="ml-2">
          <Text className="capitalize font-semibold text-gray-500 text-base">
            Item
          </Text>
          <Text className="capitalize font-semibold text-base my-1">
            {data.product.item}
          </Text>
        </View>
      </View>
    );
  };

  const TradeInComponent = () => {
    return (
      <View className="flex-row">
        <Feather name="link-2" size={20} color="gray" />
        <View className="ml-2">
          <Text className="capitalize font-semibold text-gray-500 text-base">
            Trade - in
          </Text>
          <Text className="capitalize font-semibold text-base my-1">
            ₱ {data.product.item}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="mt-3">
      {data.product.preferTrade === "cash" && <CashComponent />}
      {data.product.preferTrade === "swap" && <SwapComponent />}
      {data.product.preferTrade === "trade-in" && <TradeInComponent />}
      {/* <View className="flex-row">
        <Feather name="link-2" size={20} color="gray" />
        <View className="ml-2">
          <Text className="capitalize font-semibold text-gray-500 text-base">
            {data.product.preferTrade}
          </Text>
          <Text className="capitalize font-semibold text-base my-1">
            ₱ {data.product.cash}
          </Text>
        </View>
      </View> */}
      <View className="mt-5">
        <Text className="capitalize mb-2 font-semibold">
          {data.product.isDeliver && "delivery"}
        </Text>
        <Text className="capitalize mb-2 font-semibold">
          {data.product.isMeetup && "meetup"}
        </Text>
        <Text className="font-semibold text-base">Location</Text>
        <Text className="capitalize">{data.product.location}</Text>
      </View>
    </View>
  );
}
