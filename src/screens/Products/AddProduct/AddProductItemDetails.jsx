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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import NumberTextInput from "../../../components/CustomTextInput/NumberTextInput";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import TextAreaInput from "../../../components/CustomTextInput/TextAreaInput";
import { RadioButton } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/actions/productActions";

export default function AddProductItemDetails() {
  const [imageList, setImageList] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [tradeMethod, setTradeMethod] = useState("");
  const [hasReceipts, setHasReceipts] = useState(false);
  const [hasWarranty, setHasWarranty] = useState(false);
  const [cash, setCash] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [itemInput, setItemInput] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      //   allowsEditing: true,
      //   aspect: [4, 3],
      //   quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) return;
    if (result.assets.length > 5) {
      ToastAndroid.show("Select atleast 5 images only", ToastAndroid.SHORT);
      return;
    }

    setImageList(result.assets);
  };

  const addItemList = () => {
    if (itemInput === "") return;
    if (tradeMethod === "swap" && itemList.length >= 1) {
      ToastAndroid.show("Swap only allow 1 item to swap", ToastAndroid.SHORT);
      setItemInput("");
      return;
    }

    setItemList([...itemList, itemInput]);
    setItemInput("");
  };

  const deleteItem = (item) => {
    const newItem = itemList.filter((_item) => _item !== item);

    setItemList(newItem);
  };

  const addItem = () => {
    const product = {
      PosterUserId: 6,
      Title: title,
      Description: description,
      Condition: condition,
      PreferTrade: tradeMethod,
      DeliveryMethod: "Delivery",
      ProductStatus: "unsold",
      Location: "Urgello",
      GameGenre: "Action",
      Platform: category,
      ThumbnailUrl: "",
      Cash: cash,
      Item: itemList.toString(),
      DateCreated: new Date(),
      CountFavorite: 0,
    };
    dispatch(addProduct(product));
  };

  const ViewItemList = () => {
    return (
      <View className="flex-row">
        {itemList.length !== 0 &&
          itemList.map((item, index) => (
            <View
              className="flex-row p-2 border mr-2 rounded items-center"
              key={index}
            >
              <Text>{item}</Text>
              <Pressable
                onPress={() => deleteItem(item)}
                className="px-2 py-1 bg-gray-400 ml-2 rounded-full"
              >
                <Text className="">X</Text>
              </Pressable>
            </View>
          ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={true}
      style={styles.container}
    >
      <View className="flex-row items-center mt-2">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Pressable>
        <Text className="ml-3 text-base font-semibold">Item Details</Text>
      </View>

      <View className="my-2"></View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* For the image picker */}
        <Pressable
          onPress={pickImage}
          className="border-2 border-dashed items-center border-gray-300 p-5"
        >
          <Entypo name="images" size={30} color="gray" />
          <Text className="mt-3 mb-1 text-base font-semibold">
            Upload Photo
          </Text>
          <Text className="text-gray-500">You may select up to 5 photos.</Text>
        </Pressable>
        {/*  */}

        <Text className="text-base mt-5">Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(item) => setCategory(item)}
          className="border"
        >
          <Picker.Item label="Console" value="console" />
          <Picker.Item label="XBOX" value="xbox" />
          <Picker.Item label="XBOX 360" value="xbox360" />
          <Picker.Item label="PS4" value="ps4" />
        </Picker>

        <NumberTextInput
          placeholder={"0.00"}
          value={price}
          setValue={setPrice}
          label="Price(generated from our system)"
        />

        <CustomTextInput
          placeholder={"Give your listing a name"}
          value={title}
          setValue={setTitle}
          label="Title"
        />

        <TextAreaInput
          value={description}
          setValue={setDescription}
          placeholder="State item inclusions or defects, if any."
          label="Description"
        />

        <Text className="text-base mt-5">Condition</Text>
        <Picker
          selectedValue={condition}
          onValueChange={(item) => setCondition(item)}
          className="border"
        >
          <Picker.Item label="Brand New" value="new" />
          <Picker.Item label="Used - Fine" value="used-fine" />
          <Picker.Item label="Used - Defects" value="used-defect" />
        </Picker>

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
          <View className="flex-row items-center justify-between mb-5">
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
            <View>
              <TextInput
                keyboardType="numeric"
                placeholder="Cash"
                className="p-2 border border-gray-300 rounded-lg"
                value={cash}
                onChangeText={setCash}
              />
            </View>
          )}
          <View>
            <View className="flex-row items-center justify-between mb-5">
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
                  className="p-2 border border-gray-300 rounded-lg"
                  value={cash}
                  onChangeText={setCash}
                />

                <TextInput
                  placeholder="Item"
                  className="p-2 border border-gray-300 rounded-lg"
                  returnKeyType="done"
                  value={itemInput}
                  onChangeText={setItemInput}
                  onSubmitEditing={addItemList}
                />

                <ViewItemList />
              </View>
            )}
          </View>
          <View className="flex-row items-center justify-between">
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
                className="p-2 border border-gray-300 rounded-lg"
                returnKeyType="done"
                value={itemInput}
                onChangeText={setItemInput}
                onSubmitEditing={addItemList}
              />
              <ViewItemList />
            </View>
          )}
        </RadioButton.Group>
        <View>
          <Text className="font-semibold mb-4 text-base">Optional details</Text>
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
          onPress={addItem}
        >
          <Text className="text-white font-semibold">Delivery Method</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
});
