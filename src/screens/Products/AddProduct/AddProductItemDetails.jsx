import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import NumberTextInput from "../../../components/CustomTextInput/NumberTextInput";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import TextAreaInput from "../../../components/CustomTextInput/TextAreaInput";
import { RadioButton } from "react-native-paper";
import Checkbox from "expo-checkbox";
import Header from "../../../components/Products/AddProduct/Header";
import ViewItemList from "../../../components/Products/AddProduct/ViewItemList";
import ImagePickerProduct from "../../../components/Products/AddProduct/ImagePickerProduct";
import KeyboardHideView from "../../../components/CustomViews/KeyboardHideView";
import { useHideBottomTab } from "../../../hooks/useHideBottomTab";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";

export default function AddProductItemDetails() {
  useHideBottomTab();
  const { user } = useGetCurrentUser();

  const [imageList, setImageList] = useState([]);
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("console");
  const [condition, setCondition] = useState("new");
  const [tradeMethod, setTradeMethod] = useState("");
  const [hasReceipts, setHasReceipts] = useState(false);
  const [hasWarranty, setHasWarranty] = useState(false);
  const [cash, setCash] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [itemInput, setItemInput] = useState("");

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

  const onPressTrigger = () => {
    if (imageList.length === 0) {
      alert("please put an image.");
      return;
    }

    if (title.trim() === "") {
      alert("Please put an title");
      return;
    }

    if (description.trim() === "") {
      alert("Please put an description");
      return;
    }

    if (tradeMethod.trim() === "") {
      alert("Please select a Trade Method");
      return;
    }

    if (tradeMethod === "cash" && cash == 0) {
      alert("Please put an amount");
      return;
    }

    if (tradeMethod === "trade-in" && (cash == 0 || itemList.length === 0)) {
      alert("Please put an amount or items");
      return;
    }

    if (tradeMethod === "trade" && itemList.length === 0) {
      alert("Please put an item");
      return;
    }

    const productInfo = {
      posterUserId: user.userId,
      title: title,
      description: description,
      condition: condition,
      preferTrade: tradeMethod,
      gameGenre: "Action",
      platform: category,
      cash: cash,
      item: itemList.toString(),
      productStatus: "unsold",
      hasReceipts: hasReceipts,
      hasWarranty: hasWarranty,
    };

    navigation.navigate("AddProductDeliveryDetails", {
      productInfo,
      imageList,
    });
  };

  return (
    <KeyboardHideView>
      <Header onPress={() => navigation.goBack()} title="Item Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImagePickerProduct imageList={imageList} setImageList={setImageList} />

        <Text className="text-base mt-5">Category</Text>
        <View className="border border-gray-400 rounded-lg mt-2">
          <Picker
            selectedValue={category}
            onValueChange={(item) => setCategory(item)}
            style={{ color: "gray" }}
          >
            <Picker.Item label="Console" value="console" />
            <Picker.Item label="XBOX" value="xbox" />
            <Picker.Item label="XBOX 360" value="xbox360" />
            <Picker.Item label="PS4" value="ps4" />
          </Picker>
        </View>

        <View className="my-3" />
        <NumberTextInput
          placeholder={"0.00"}
          value={price}
          setValue={setPrice}
          label="Price(generated from our system)"
        />
        <View className="my-3" />

        <CustomTextInput
          placeholder={"Give your listing a name"}
          value={title}
          setValue={setTitle}
          label="Title"
        />
        <View className="my-3" />

        <TextAreaInput
          value={description}
          setValue={setDescription}
          placeholder="State item inclusions or defects, if any."
          label="Description"
        />
        <View className="my-3" />

        <Text className="text-base mb-2">Condition</Text>
        <View className="border border-gray-300 rounded-lg">
          <Picker
            selectedValue={condition}
            onValueChange={(item) => setCondition(item)}
            style={{ color: "gray" }}
          >
            <Picker.Item label="Brand New" value="new" />
            <Picker.Item label="Used - Fine" value="used-fine" />
            <Picker.Item label="Used - Defects" value="used-defect" />
          </Picker>
        </View>
        <View className="my-3" />

        <Text className="text-base font-semibold mb-3">Trade Method</Text>
        <RadioButton.Group
          onValueChange={(value) => {
            setTradeMethod(value);
            setItemInput("");
            setItemList([]);
            setCash(0);
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
            {tradeMethod === "cash" && (
              <TextInput
                keyboardType="numeric"
                placeholder="Cash"
                className="py-2 px-4 border border-gray-300 rounded-lg mt-2 mb-4"
                value={cash}
                onChangeText={setCash}
              />
            )}
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
                  placeholder="Cash"
                  className="p-2 border border-gray-400 rounded-lg"
                  value={cash}
                  onChangeText={setCash}
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

        <View className="my-10"></View>
        <Pressable
          className="w-full bg-[#CC481F] p-4 items-center rounded-lg mb-4"
          onPress={onPressTrigger}
        >
          <Text className="text-white font-semibold">Delivery Method</Text>
        </Pressable>
      </ScrollView>
    </KeyboardHideView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
});
