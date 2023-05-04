import { Linking, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import useGetProductId from "../../../hooks/Product/useGetProductId";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function ProductTrade() {
  const { data } = useGetProductId();
  const CashComponent = () => {
    return (
      <View className="flex-row">
        <Feather name="link-2" size={20} color="gray" />
        <View className="ml-4">
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
        <View className="ml-4">
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
        <View className="ml-4">
          <Text className="capitalize font-semibold text-gray-500 text-base">
            Trade - in
          </Text>
          <Text className="capitalize font-semibold text-base my-1">
            ₱ {data.product.cash} & {data.product.item}
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
      <View className="mt-5">
        <View className="flex-row">
          <FontAwesome5 name="shipping-fast" size={18} color="gray" />
          <View className="ml-2">
            <Text className="font-semibold text-base">Shipping Method</Text>
            <View className="flex-row">
              <Text className="capitalize mb-2 ">
                {data.product.isDeliver && "Delivery"}
              </Text>
              <Text>
                {data.product.isDeliver && data.product.isMeetup && " & "}
              </Text>
              <Text className="capitalize mb-2 ">
                {data.product.isMeetup && "Meetup"}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row mt-5">
          <Ionicons name="ios-location-sharp" size={22} color="gray" />
          <View className="ml-2">
            <Text className="font-semibold text-base">Location</Text>
            <Text
              className="capitalize text-[#CC481F]"
              onPress={() =>
                Linking.openURL(
                  `http://maps.google.com/?q=${data.product.location}`
                )
              }
            >
              {data.product.location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
