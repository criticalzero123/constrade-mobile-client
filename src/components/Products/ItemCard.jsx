import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function ItemCard({ data, index, showLike = true }) {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Pressable
      className={`mb-6 mr-2  ${index === 0 && "ml-5 "}`}
      style={{ width: width * 0.4, height: height * 0.25 }}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: data.productId,
        })
      }
    >
      <View className="h-3/4 relative overflow-hidden rounded-t-lg">
        <Image
          source={{
            uri: data.thumbnailUrl,
          }}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            resizeMode: "cover",
          }}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.55)"]}
          className="w-full mb-2 h-full absolute"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        ></LinearGradient>
        <View className="absolute bg-[#CC481F] left-2 top-2 rounded justify-center tracking-widest">
          <Text className="uppercase  font-semibold text-white  py-2 px-3">
            {data.preferTrade}
          </Text>
        </View>
      </View>
      <View className="bg-white p-2 rounded-b-lg shadow-2xl w-full">
        <View className="flex-row justify-between ">
          <Text numberOfLines={1} className="font-semibold flex-1">
            {data.productName}
          </Text>

          {showLike && <AntDesign name="hearto" size={18} color="gray" />}
        </View>
        <View className="flex-row items-center mt-2 w-full ">
          <View className="overflow-hidden" style={{ borderRadius: 1000 }}>
            <Image
              source={{ uri: data.userImage }}
              className="w-5 h-5 rounded-full"
            />
          </View>
          <View className="mx-1" />

          <Text className="text-gray-400">by</Text>

          <Text
            className="capitalize ml-1 font-semibold truncate flex-1"
            numberOfLines={1}
          >
            {data.userName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
