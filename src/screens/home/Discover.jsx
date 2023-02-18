import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import DiscoverHeader from "../../components/Home/DiscoverHeader";
import FlatListCategories from "../../components/Home/FlatListCategories";

export default function Discover() {
  const image = {
    uri: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  };

  const imageConsole = {
    uri: "https://static.wikia.nocookie.net/ba41dae4-20ab-4d0c-9ac9-82073ac1f9d1/scale-to-width-down/800",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DiscoverHeader />
        <View style={{ paddingHorizontal: 20 }}>
          {/* For search make an another component for this */}
          <View className="py-4 px-2 rounded-lg bg-gray-300 mt-4 mb-3">
            <Text>Search</Text>
          </View>

          {/* For the features */}
          <View className="w-11/12">
            <ImageBackground
              source={image}
              resizeMethod="auto"
              className="h-32 justify-center items-center p-4"
              imageStyle={{
                backgroundColor: "black",
                opacity: 0.6,
                borderRadius: 7,
              }}
            >
              <Text className="text-white font-bold text-base mb-3">
                Introducing Trade-ins
              </Text>
              <Text className="text-gray-100">
                Curated trade-in items just for you. Check it out now!
              </Text>
            </ImageBackground>
          </View>
          {/*  */}
          {/* For Browse */}

          <FlatListCategories />
          {/*  */}
          <View className="my-3"></View>
          {/* For just for you */}
          <View className="flex-row justify-between">
            <Text>Just for you</Text>
            <Text className="text-[#CC481F] font-semibold">See all</Text>
          </View>
          <View className="w-1/2 bg-white">
            <ImageBackground
              source={imageConsole}
              resizeMethod="auto"
              className="h-40"
              imageStyle={{
                backgroundColor: "black",
                opacity: 0.5,
                borderRadius: 10,
              }}
            >
              <View className="mt-4 h-full relative">
                <Text className="bg-[#CC481F] py-1 px-2 text-white font-semibold">
                  TRADE-IN
                </Text>
                <Text className="text-white py-1 px-2 absolute bottom-6">
                  1 day ago
                </Text>
              </View>
            </ImageBackground>
            <View className="p-2">
              <View className="flex-row justify-between">
                <Text>P99</Text>
                <Text>Heart</Text>
              </View>
              <Text numberOfLines={1}>Legend of Zelda with asdasdasdadasd</Text>
              <View className="flex-row">
                <View className="p-2 rounded-full bg-gray-500 w-2"></View>
                <Text>by Sabrican Inanir</Text>
              </View>
            </View>
          </View>
          {/*  */}
          <View className="my-3"></View>
          <View className="bg-gray-500 p-10">
            <Text>Ads</Text>
          </View>
          <View className="my-3"></View>

          {/* For Deals near you */}
          <View className="flex-row justify-between">
            <Text>Deals near you</Text>
            <Text className="text-[#CC481F] font-semibold">See all</Text>
          </View>
          <View className="w-1/2 bg-white">
            <ImageBackground
              source={imageConsole}
              resizeMethod="auto"
              className="h-40"
              imageStyle={{
                backgroundColor: "black",
                opacity: 0.5,
                borderRadius: 10,
              }}
            >
              <View className="mt-4 h-full relative">
                <Text className="bg-[#CC481F] py-1 px-2 text-white font-semibold">
                  TRADE-IN
                </Text>
                <Text className="text-white py-1 px-2 absolute bottom-6">
                  1 day ago
                </Text>
              </View>
            </ImageBackground>
            <View className="p-2">
              <View className="flex-row justify-between">
                <Text>P99</Text>
                <Text>Heart</Text>
              </View>
              <Text numberOfLines={1}>Legend of Zelda with asdasdasdadasd</Text>
              <View className="flex-row">
                <View className="p-2 rounded-full bg-gray-500 w-2"></View>
                <Text>by Sabrican Inanir</Text>
              </View>
            </View>
          </View>
        </View>
        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
