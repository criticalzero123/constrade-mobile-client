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
import ButtonOptionActive from "../../../components/Products/AddProduct/ButtonOptionActive";
import ButtonOption from "../../../components/Products/AddProduct/ButtonOption";
import { useNavigation } from "@react-navigation/native";
import { optionItem } from "../../../../service/addProductService";
import { useState } from "react";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";

export default function AddProductOptions() {
  const [active, setActive] = useState(0);
  const navigation = useNavigation();
  const { user } = useGetCurrentUser();

  const handleProceed = () => {
    if (user.userType === "semi-verified") {
      alert("You are semi-verified user. Please verified your account.");
      return;
    }

    navigation.navigate("AddProductSearchItems");
  };

  return (
    <SafeAreaView
      style={styles.container}
      className="items-center px-4 justify-between h-full"
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
        {optionItem.map((item, index) =>
          active === item.id ? (
            <ButtonOptionActive
              onPress={() => ToastAndroid.show("Pressed", ToastAndroid.SHORT)}
              data={item}
              key={item.id}
            />
          ) : (
            <ButtonOption
              onPress={() =>
                item.active
                  ? setActive(index)
                  : ToastAndroid.show("coming soon", ToastAndroid.SHORT)
              }
              data={item}
              key={item.id}
            />
          )
        )}

        <View className="my-1"></View>
      </View>

      <View className="w-full">
        {user.countPost > 0 ? (
          <Text className="text-center mb-5">
            You have a <Text className="text-[#CC481F]">{user.countPost} </Text>
            left of count post.
          </Text>
        ) : (
          <Text className="text-center mb-5">
            You have no count post you can refill in your profile.
          </Text>
        )}

        <Pressable
          className="w-full bg-[#CC481F] p-4 items-center rounded mb-5"
          onPress={handleProceed}
        >
          <Text className="font-semibold text-base text-white">Proceed</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
