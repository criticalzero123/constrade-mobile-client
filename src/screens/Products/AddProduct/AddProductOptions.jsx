import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
} from "react-native";
import React from "react";

import console_images from "../../../../assets/Product/ProductAdd/console_images.png";
import ButtonOptionActive from "../../../components/Products/ButtonOptionActive";
import ButtonOption from "../../../components/Products/ButtonOption";
import { useNavigation } from "@react-navigation/native";

export default function AddProductOptions() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={styles.container}
      className="items-center px-4 justify-between"
    >
      <View className="items-center mt-16">
        <Image source={console_images} />
        <View className="my-3"></View>
        <Text className="font-bold text-2xl mb-1">
          Start selling and earn more money
        </Text>
        <Text className="text-gray-500">
          Select what kind item you are going to trade.
        </Text>
      </View>

      <View className="w-full">
        <ButtonOptionActive
          onPress={() => ToastAndroid.show("Pressed", ToastAndroid.SHORT)}
        >
          <Text className="mb-2 font-bold text-white text-base">Games</Text>
          <Text className="text-gray-100">Physical game copy</Text>
        </ButtonOptionActive>

        <View className="my-1"></View>

        <ButtonOption
          onPress={() => ToastAndroid.show("Coming soon", ToastAndroid.SHORT)}
        >
          <Text className="mb-2 font-bold text-base">
            Accessories
            <Text className="text-xs text-gray-400"> (coming soon)</Text>
          </Text>
          <Text className="text-gray-500">
            Game controllers, skins, and others
          </Text>
        </ButtonOption>

        <View className="my-1"></View>

        <ButtonOption
          onPress={() => ToastAndroid.show("Coming soon", ToastAndroid.SHORT)}
        >
          <Text className="mb-2 font-bold text-base">
            Console
            <Text className="text-xs text-gray-400"> (coming soon)</Text>
          </Text>
          <Text className="text-gray-500">
            XBOX, Nintendo, and Playstation consoles
          </Text>
        </ButtonOption>
      </View>

      <Pressable
        className="w-full bg-[#CC481F] p-4 items-center rounded mb-5"
        onPress={() => navigation.navigate("AddProductItemDetails")}
      >
        <Text className="font-semibold text-base text-white">Proceed</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
