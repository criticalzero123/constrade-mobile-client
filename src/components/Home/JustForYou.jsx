import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemCard from "../Products/ItemCard";
import { getPopularProduct } from "../../../redux/actions/homeActions";
import { useState } from "react";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";

export default function JustForYou() {
  const navigation = useNavigation();
  const [products, setProducts] = useState();
  useHideBottomTab();
  useEffect(() => {
    const fetch = async () => {
      const res = await getPopularProduct(4);

      setProducts(res);
    };

    fetch();
  }, []);

  if (products === undefined)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  if (products)
    return (
      <View className="">
        <View className="flex-row justify-between mb-5 px-5">
          <Text className="font-semibold text-lg">Just for you</Text>
          <Pressable onPress={() => navigation.navigate("PopularScreen")}>
            <Text className="text-[#CC481F] font-semibold text-lg">
              See all
            </Text>
          </Pressable>
        </View>
        <View className="w-full flex-row flex-wrap justify-evenly ml-2">
          {products.map((data, index) => (
            <ItemCard data={data} key={index} showLike={false} />
          ))}
        </View>
        <Pressable onPress={() => navigation.navigate("PopularScreen")}>
          <Text className="text-[#CC481F] font-semibold text-base text-center">
            Show more
          </Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({});
