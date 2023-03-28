import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
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
import Modal from "react-native-modal";

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
    if (search.trim() !== "") {
      setSearch("");
      navigation.navigate("AddProductSearchResults", { search });
    } else alert("Please input something ");
  };

  const toggleModal = (shop) => {
    setShopInfo(shop);
    setModalVisible(!isModalVisible);
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Search item"} />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search here..."
        onSubmitEditing={handleSubmit}
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
                  onPress={() => Linking.openURL(`${shopInfo.originUrl}`)}
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
      {shops && shops.length !== 0 && (
        <View className="flex-1 flex-row items-end mb-2">
          <Text
            className="py-4 bg-[#CC481F] flex-1 text-center text-white font-semibold"
            style={{ borderRadius: 5 }}
          >
            I will provide my own price
          </Text>
        </View>
      )}
      <Modal
        isVisible={isModalVisible}
        className="m-0 flex-1 justify-end"
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        hasBackdrop
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={50}
      >
        <View
          className="bg-white p-6"
          style={{
            height: height * 0.3,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
          {shopInfo && (
            <>
              <Text className="text-xl text-gray-500 mb-4">
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
                <Pressable onPress={() => Linking.openURL(`${shop.originUrl}`)}>
                  <Text className="ml-2 text-blue-400 underline">Source</Text>
                </Pressable>
              </View>
              <View className=" flex-1 justify-end">
                <Pressable
                  className="py-4 bg-[#CC481F]"
                  style={{ borderRadius: 5 }}
                >
                  <Text className="text-center font-semibold text-white">
                    Proceed with this price
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </Modal>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
