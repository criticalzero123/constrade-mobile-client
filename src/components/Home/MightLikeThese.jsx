import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemCard from "../Products/ItemCard";
import { useState } from "react";
import { useEffect } from "react";
import { getBoostedProducts } from "../../../redux/actions/homeActions";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function MightLikeThese() {
  const [boosted, setBoosted] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const fetch = async () => {
      const res = await getBoostedProducts();

      setBoosted(res);
    };

    fetch();
  }, []);

  if (boosted === undefined) return <ActivityIndicator />;

  if (boosted && boosted.length > 0)
    return (
      <View className="w-full">
        <View className="px-5">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-lg">You might like these</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("BoostedScreen", { data: boosted })
              }
            >
              <Text className="font-semibold text-lg text-[#CC481F]">
                See all
              </Text>
            </Pressable>
          </View>
          <Text className="text-gray-400 w-3/4 text-base mt-1 mb-4">
            Looks like you are recently looking for a console game. Here's what
            we got for you!
          </Text>
        </View>
        <FlatList
          data={boosted}
          renderItem={({ item, index }) => (
            <ItemCard data={item} index={index} key={index} showLike={false} />
          )}
          ItemSeparatorComponent={() => <View className="mx-1" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
}

const styles = StyleSheet.create({});
