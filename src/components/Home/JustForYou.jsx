import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemCard from "../Products/ItemCard";
import { tempDataItem } from "../../../service/discoverService";
import { getPopularProduct } from "../../../redux/actions/homeActions";
import { useState } from "react";
import { useEffect } from "react";

export default function JustForYou() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getPopularProduct(4);

      setProducts(res);
    };

    fetch();
  }, []);

  if (products)
    return (
      <View className="">
        <View className="flex-row justify-between mb-2 px-5">
          <Text className="font-semibold text-lg">Just for you</Text>
          <Text className="text-[#CC481F] font-semibold text-lg">See all</Text>
        </View>
        <View className="w-full flex-row flex-wrap justify-evenly ml-2">
          {products.map((data, index) => (
            <ItemCard data={data} key={index} />
          ))}
        </View>
        <Text className="text-[#CC481F] font-semibold text-base text-center">
          Show more
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({});
