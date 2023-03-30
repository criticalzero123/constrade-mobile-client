import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useProductShop from "../../../hooks/Product/useProductShop";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useHideBottomTab } from "../../../hooks/useHideBottomTab";
import BottomModal from "../../../components/modal/BottomModal";

export default function AddProductSearchItems({ route }) {
  useHideBottomTab();

  const param = route.params;
  const [shops] = useProductShop(param && param.itemName);
  const [search, setSearch] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [shopInfo, setShopInfo] = useState();

  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const handleSubmit = () => {
    if (search.trim() !== "")
      navigation.navigate("AddProductSearchResults", { search });
    else alert("Please input something ");
  };

  const toggleModal = (shop) => {
    setShopInfo(shop);
    setModalVisible(!isModalVisible);
  };

  const onHandleProceedWithPrice = () => {
    setModalVisible(false);
    const info = {
      title: param.itemName,
      itemValue: shopInfo.value,
      sourceId: shopInfo.productPricesId,
      genre: shopInfo.genre,
      platform: shopInfo.platform,
      isGenerated: true,
    };
    navigation.navigate("AddProductItemDetails1", { data: info });
  };

  const onHandleWithoutPrice = () => {
    setModalVisible(false);
    const info = {
      title: param.itemName,
      isGenerated: false,
    };
    navigation.navigate("AddProductItemDetails1", { data: info });
  };

  const OwnPrice = () => {
    return (
      <Pressable
        className="flex-1 flex-row items-end mb-2"
        onPress={onHandleWithoutPrice}
      >
        <Text
          className="py-4 bg-[#CC481F] flex-1 text-center text-white font-semibold"
          style={{ borderRadius: 5 }}
        >
          I will provide my own price
        </Text>
      </Pressable>
    );
  };
  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Search item"} />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search here..."
        onSubmitEditing={handleSubmit}
        className="py-3 bg-gray-200 px-4 mb-4"
        style={{ borderRadius: 5 }}
      />
      {shops && shops.length !== 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: height * 0.7 }}
        >
          <Text style={{ width: width * 0.7 }} className="mb-2 text-[#087096]">
            Automated Price for you based on item condition and market value.
          </Text>
          {shops.map((shop, index) => (
            <View
              key={index}
              className="my-2 flex-row items-center justify-between"
            >
              <View>
                <Pressable
                  className="flex-row items-center  mb-2"
                  onPress={() => Linking.openURL(`${shop.originUrl}`)}
                >
                  <Ionicons name="link-outline" size={22} color="gray" />
                  <Text className="capitalize text-gray-400 text-base font-semibold ml-2">
                    {shop.shopName}
                  </Text>
                </Pressable>
                <View className="flex-row items-center mb-1">
                  <Text className="text-sm font-semibold">PHP</Text>
                  <Text className="text-[#087096] ml-2 font-semibold text-lg">
                    {shop.value}
                  </Text>
                </View>
                <View className="flex-row items-center mb-1">
                  <MaterialIcons name="info-outline" size={22} color="gray" />
                  <Text className="ml-2 text-gray-400">Brand new</Text>
                </View>
              </View>
              <Pressable onPress={() => toggleModal(shop)}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="gray"
                />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
      <>
        {shops && (
          <View className="flex-1">
            {param &&
              param.itemName !== undefined &&
              (shops.length === 0 ? (
                <View className="flex-1">
                  <Text>No price data exist in our database</Text>
                  <OwnPrice />
                </View>
              ) : (
                <OwnPrice />
              ))}
          </View>
        )}

        <BottomModal setIsVisible={setModalVisible} isVisible={isModalVisible}>
          {shopInfo && (
            <View className="w-full">
              <Text className="text-xl text-gray-500 mb-4 capitalize">
                {shopInfo.shopName}
              </Text>

              <View className="flex-row items-center mb-2">
                <Text className="text-sm font-semibold">PHP</Text>
                <Text className="text-[#087096] ml-2 font-semibold text-lg">
                  {shopInfo.value}
                </Text>
              </View>
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="info-outline" size={22} color="gray" />
                <Text className="ml-2 text-gray-400">Brand new</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="link-outline" size={22} color="gray" />
                <Pressable
                  onPress={() => Linking.openURL(`${shopInfo.originUrl}`)}
                >
                  <Text className="ml-2 text-blue-400 underline">Source</Text>
                </Pressable>
              </View>

              <Pressable
                className="bg-[#CC481F] p-4 mt-10"
                style={{ borderRadius: 5 }}
                onPress={onHandleProceedWithPrice}
              >
                <Text className="text-center font-semibold text-white ">
                  Proceed with this price
                </Text>
              </Pressable>
            </View>
          )}
        </BottomModal>
      </>
    </ContainerSafeView>
  );
}
