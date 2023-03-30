import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import ViewItemList from "../../../components/Products/AddProduct/ViewItemList";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";

export default function AddProductItemDetails2({ route }) {
  const { data, imageList } = route.params;
  const { user } = useGetCurrentUser();
  const [modelNumber, setModelNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemInput, setItemInput] = useState("");
  const [amount, setAmount] = useState(0);
  const [tradeMethod, setTradeMethod] = useState("");
  const [hasReceipts, setHasReceipts] = useState(false);
  const [hasWarranty, setHasWarranty] = useState(false);

  const navigation = useNavigation();

  const addItemList = () => {
    if (itemInput.trim() === "") return;
    if (tradeMethod === "swap" && itemList.length >= 1) {
      ToastAndroid.show("Swap only allow 1 item to swap", ToastAndroid.SHORT);
      setItemInput("");
      return;
    }

    setItemList([...itemList, itemInput]);
    setItemInput("");
  };

  const handleOnNext = () => {
    if (tradeMethod === "") {
      alert("Please choose a trade method");
      return;
    }
    if (
      tradeMethod === "trade-in" &&
      itemList.length < 2 &&
      (amount == 0 || itemList.length === 0)
    ) {
      alert("Please put an amount or items");
      return;
    }

    if (tradeMethod === "swap" && itemList.length === 0) {
      alert("Please put an item");
      return;
    }
    const _data = {
      posterUserId: user.userId,
      ...data,
      preferTrade: tradeMethod,
      cash: amount === 0 ? parseInt(data.cash) : amount,
      item: itemList.toString(),
      productStatus: "unsold",
      hasReceipts,
      hasWarranty,
      modelNumber,
      serialNumber,
    };

    navigation.navigate("AddProductDeliveryDetails", {
      data: _data,
      imageList,
    });
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"item details"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text className="mb-2 font-semibold text-base">Model number</Text>
          <TextInput
            value={modelNumber}
            onChangeText={setModelNumber}
            placeholder="MODEL - 12391"
            className="border py-2 px-3 border-gray-300"
            style={{ borderRadius: 10 }}
          />
        </View>

        <View className="mt-4 ">
          <Text className="mb-2 font-semibold text-base">Serial number</Text>
          <TextInput
            value={serialNumber}
            onChangeText={setSerialNumber}
            placeholder="MODEL - 12391"
            className="border py-2 px-3 border-gray-300"
            style={{ borderRadius: 10 }}
          />
        </View>

        <RadioButton.Group
          onValueChange={(value) => {
            setTradeMethod(value);
            setItemInput("");
            setItemList([]);
            setAmount(0);
          }}
          value={tradeMethod}
        >
          <View className="mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row">
                <Entypo name="list" size={23} color="gray" />
                <View className="ml-2">
                  <Text className="font-semibold mb-1">Cash only</Text>
                  <Text className="text-gray-400">
                    I want to sell this item for cash only.
                  </Text>
                </View>
              </View>
              <RadioButton value="cash" />
            </View>
          </View>
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row">
                <Entypo name="list" size={23} color="gray" />
                <View className="ml-2">
                  <Text className="font-semibold mb-1">Trade - in</Text>
                  <Text className="text-gray-400">
                    Trade with cash or/and specified item(s).
                  </Text>
                </View>
              </View>
              <RadioButton value="trade-in" />
            </View>
            {tradeMethod === "trade-in" && (
              <View>
                <TextInput
                  keyboardType="numeric"
                  placeholder={`Enter amount...`}
                  className="p-2 border border-gray-400 rounded-lg"
                  value={amount}
                  onChangeText={setAmount}
                />
                <View className="my-1" />
                <TextInput
                  placeholder="Item"
                  className="p-2 border border-gray-400 rounded-lg"
                  returnKeyType="done"
                  value={itemInput}
                  onChangeText={setItemInput}
                  onSubmitEditing={addItemList}
                />

                <ViewItemList itemList={itemList} setItemList={setItemList} />
              </View>
            )}
          </View>
          <View>
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row">
                <Entypo name="list" size={23} color="gray" />
                <View className="ml-2">
                  <Text className="font-semibold mb-1">Swap</Text>
                  <Text className="text-gray-400">
                    Swap my item with another item.
                  </Text>
                </View>
              </View>
              <RadioButton value="swap" />
            </View>
            {tradeMethod === "swap" && (
              <View>
                <TextInput
                  placeholder="Item"
                  className="p-2 border border-gray-400 rounded-lg"
                  returnKeyType="done"
                  value={itemInput}
                  onChangeText={setItemInput}
                  onSubmitEditing={addItemList}
                />
                <ViewItemList itemList={itemList} setItemList={setItemList} />
              </View>
            )}
          </View>
        </RadioButton.Group>
        <View className="my-3" />
        <View>
          <Text className="font-semibold mb-6 text-base">Optional details</Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold mb-2">Include receipts</Text>
              <Text className="text-gray-400">
                This item comes with proof of purchase
              </Text>
            </View>
            <Checkbox value={hasReceipts} onValueChange={setHasReceipts} />
          </View>
          <View className="my-2"></View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold mb-2">Warranty</Text>
              <Text className="text-gray-400">
                This item is still covered by manufacturer warranty.
              </Text>
            </View>
            <Checkbox value={hasWarranty} onValueChange={setHasWarranty} />
          </View>
        </View>
        <View className="justify-end flex-1 mb-5">
          <Pressable
            className="py-4 bg-[#CC481F]"
            style={{ borderRadius: 10 }}
            onPress={handleOnNext}
          >
            <Text className="text-center text-white">Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ContainerSafeView>
  );
}
