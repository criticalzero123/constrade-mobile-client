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
  const imageConsole =
    "https://images.saymedia-content.com/.image/t_share/MTc0MzY1MzUwMzM3NDU1NzUw/most-annoying-monsters-breath-of-the-wild.png";
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
            uri:
              data.thumbnailUrl !== undefined
                ? data.thumbnailUrl
                : imageConsole,
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
        <View className="w-1/2 h-1/5 absolute bg-[#CC481F] -left-1 top-3 rounded justify-center">
          <Text className="uppercase  font-semibold text-white ml-3">
            {data.preferTrade}
          </Text>
        </View>
        <Text className="absolute  bottom-0 py-2 px-1 text-white ml-2">
          1 day ago
        </Text>
      </View>
      <View className="bg-white p-2 rounded-b-lg shadow-2xl w-full">
        <View className="flex-row justify-between ">
          <Text numberOfLines={1} className="font-semibold flex-1">
            {data.productName}
          </Text>

          {showLike && <AntDesign name="hearto" size={18} color="gray" />}
        </View>
        <View className="flex-row items-center mt-2 w-full ">
          <Image
            source={{ uri: data.userImage }}
            className="w-5 h-5 rounded-full"
          />

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
