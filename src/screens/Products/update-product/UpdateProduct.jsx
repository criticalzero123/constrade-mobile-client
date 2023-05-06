import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import { useState } from "react";
import { stringToArrayList } from "../../../../service/addProductService";
import BottomModal from "../../../components/modal/BottomModal";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { StackActions, useNavigation } from "@react-navigation/native";
import { editProduct } from "../../../../redux/actions/productActions";

export default function UpdateProduct({ route }) {
  const { product } = route.params;
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const _strGenreList = stringToArrayList(product.gameGenre);
  const _strPlatformList = stringToArrayList(product.platform);

  const [platformModalVisible, setPlatformModalVisible] = useState(false);
  const [genreModalVisible, setGenreModalVisible] = useState(false);

  const [platform, setPlatform] = useState("");
  const [tempPlatformList, setTempPlatformList] = useState(_strPlatformList);
  const [platformList, setPlatformList] = useState(_strPlatformList);

  const [genreValue, setGenreValue] = useState("");
  const [tempGenreList, setTempGenreList] = useState(_strGenreList);
  const [genreList, setGenreList] = useState(_strGenreList);

  const [description, setDescription] = useState(product.description);
  const [modelNumber, setModelNumber] = useState(product.modelNumber);
  const [serialNumber, setSerialNumber] = useState(product.serialNumber);
  const [hasReceipts, setHasReceipts] = useState(product.hasReceipts);
  const [hasWarranty, setHasWarranty] = useState(product.hasWarranty);
  const [location, setLocation] = useState(product.location);
  const [isDelivery, setIsDelivery] = useState(product.isDeliver);
  const [isMeetup, setIsMeetup] = useState(product.isMeetup);
  const [sending, setSending] = useState(false);

  //   console.log(product);

  const handleSubmit = () => {
    setPlatform("");
    setTempPlatformList([...tempPlatformList, platform]);
  };
  const handleSubmitGenre = () => {
    setGenreValue("");
    setTempGenreList([...tempGenreList, genreValue]);
  };

  const onRemove = (text) => {
    const filtered = tempPlatformList.filter((_p) => _p !== text);

    setTempPlatformList(filtered);
  };

  const onRemoveGenre = (text) => {
    const filtered = tempGenreList.filter((_p) => _p !== text);

    setTempGenreList(filtered);
  };

  const handleDonePlatform = () => {
    setPlatformModalVisible(!platformModalVisible);
    setPlatformList(tempPlatformList);
  };

  const handleDoneGenre = () => {
    setGenreModalVisible(!genreModalVisible);
    setGenreList(tempGenreList);
  };

  const validation = () => {
    setSending(true);
    if (description.trim() === "") {
      alert("Please input description");
      return;
    }

    if (genreList.length === 0) {
      alert("Please input genre");
      return;
    }

    if (platformList.length === 0) {
      alert("Please input platform");
      return;
    }

    if (!isMeetup && !isDelivery) {
      alert("Please input delivery details");
      return;
    }

    if (location.trim() === "") {
      alert("Please input location details");
      return;
    }
  };
  const onSubmit = async () => {
    validation();

    const productDetails = {
      ...product,
      gameGenre: genreList.toString(),
      platform: platformList.toString(),
      description: description,
      modelNumber: modelNumber,
      serialNumber: serialNumber,
      isMeetup: isMeetup,
      isDeliver: isDelivery,
      hasWarranty: hasWarranty,
      hasReceipts: hasReceipts,
      location: location,
    };

    const result = await editProduct(product.productId, productDetails);

    if (result) {
      alert("Product Updated");
      navigation.dispatch(
        StackActions.replace("ProductDetails", { productId: product.productId })
      );
    } else {
      alert("Server cannot be reach.");
      setSending(false);
    }
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={`Edit ${product.title}`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="my-4">
          <Text className="mb-2 font-semibold text-base">Description</Text>
          <TextInput
            className="border  align-text-top border-gray-300 p-3 "
            placeholder="People would likely to like the item that are well described."
            multiline
            style={{
              height: height * 0.2,
              textAlignVertical: "top",
              borderRadius: 5,
            }}
            value={description}
            onChangeText={setDescription}
          />
        </View>
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
            placeholder="SERIAL - 12391"
            className="border py-2 px-3 border-gray-300"
            style={{ borderRadius: 10 }}
          />
        </View>

        <View className="my-2">
          <Text className="mb-2 font-semibold text-base">Genre</Text>
          <Pressable
            className="flex-row items-center mb-2"
            onPress={() => setGenreModalVisible(!genreModalVisible)}
          >
            <MaterialIcons name="add" size={24} color="#CC481F" />
            <Text className="text-[#CC481F] ml-1 font-semibold">
              {genreList.length === 0 ? "Add" : "Edit"} genre
            </Text>
          </Pressable>
          <View className="flex-row">
            {genreList.map(
              (item, index) =>
                index < 3 && (
                  <View
                    key={index}
                    className="px-4 py-2 bg-gray-200 mr-2 "
                    style={{ borderRadius: 1000 }}
                  >
                    <Text className="text-gray-500 font-semibold">{item}</Text>
                  </View>
                )
            )}
            {genreList.length - 3 > 0 && (
              <Pressable
                onPress={() => setGenreModalVisible(!genreModalVisible)}
                className="px-4 py-2 bg-[#CC481F] mr-2 "
                style={{ borderRadius: 1000 }}
              >
                <Text className="text-white">+{genreList.length - 3} more</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View className="my-2">
          <Text className="mb-2 font-semibold text-base">
            Supported platforms
          </Text>
          <Pressable
            className="flex-row items-center mb-2"
            onPress={() => setPlatformModalVisible(!platformModalVisible)}
          >
            <MaterialIcons name="add" size={24} color="#CC481F" />
            <Text className="text-[#CC481F] ml-1 font-semibold">
              {platformList.length === 0 ? "Add" : "Edit"} platform
            </Text>
          </Pressable>
          <View className="flex-row">
            {platformList.map(
              (item, index) =>
                index < 3 && (
                  <View
                    key={index}
                    className="px-4 py-2 bg-gray-200 mr-2 "
                    style={{ borderRadius: 1000 }}
                  >
                    <Text className="text-gray-500 font-semibold">{item}</Text>
                  </View>
                )
            )}
            {platformList.length - 3 > 0 && (
              <Pressable
                onPress={() => setPlatformModalVisible(!platformModalVisible)}
                className="px-4 py-2 bg-[#CC481F] mr-2 "
                style={{ borderRadius: 1000 }}
              >
                <Text className="text-white">
                  +{platformList.length - 3} more
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <View className="my-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold mb-2 text-base">
                Include receipts
              </Text>
              <Text className="text-gray-400">
                This item comes with proof of purchase
              </Text>
            </View>
            <Checkbox value={hasReceipts} onValueChange={setHasReceipts} />
          </View>
          <View className="my-2"></View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold mb-2 text-base">Warranty</Text>
              <Text className="text-gray-400">
                This item is still covered by manufacturer warranty.
              </Text>
            </View>
            <Checkbox value={hasWarranty} onValueChange={setHasWarranty} />
          </View>
        </View>
        <View>
          <Text className="my-5 text-base font-semibold">Delivery Details</Text>
          <View className="flex-row items-center">
            <Checkbox value={isMeetup} onValueChange={setIsMeetup} />
            <Text className="font-semibold ml-2">Meetup</Text>
          </View>
          <View className="my-2"></View>
          <View className="flex-row items-center">
            <Checkbox value={isDelivery} onValueChange={setIsDelivery} />
            <Text className="font-semibold ml-2">Deliver</Text>
          </View>
        </View>
        <View className="my-2" />
        <CustomTextInput
          value={location}
          setValue={setLocation}
          placeholder="Please input the location"
          label="Location"
        />
        <View className="justify-end flex-1 mb-3">
          <Pressable
            className={`w-full ${
              sending ? "bg-[#e48568] " : "bg-[#CC481F] "
            }  py-4 rounded mb-4 flex-row items-center justify-center mt-10`}
            disabled={sending}
            onPress={onSubmit}
          >
            <Text className="text-white font-semibold">Update</Text>
          </Pressable>
          <Pressable
            className="border border-[#CC481F] py-4 items-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-[#CC481F]">Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomModal
        isVisible={platformModalVisible}
        setIsVisible={setPlatformModalVisible}
        hasBackdrop={false}
      >
        <Text>Enter platform</Text>
        <TextInput
          value={platform}
          onChangeText={setPlatform}
          placeholder="Enter platform here..."
          className="p-3  border w-full my-2 border-gray-300"
          style={{ borderRadius: 5 }}
          onSubmitEditing={handleSubmit}
          autoCapitalize="none"
        />
        <ScrollView
          style={{ height: height * 0.2 }}
          showsVerticalScrollIndicator={false}
        >
          {tempPlatformList.map((item, index) => (
            <View key={index} className="flex-row items-center">
              <Pressable onPress={() => onRemove(item)}>
                <Entypo name="minus" size={24} color="#CC481F" />
              </Pressable>
              <Text>{item}</Text>
            </View>
          ))}
        </ScrollView>
        <View className="justify-end">
          <Pressable
            className={`${
              tempPlatformList.length === 0 ? "bg-[#cc471f3f]" : "bg-[#CC481F]"
            } py-4`}
            style={{ borderRadius: 5 }}
            onPress={handleDonePlatform}
            disabled={tempPlatformList.length === 0}
          >
            <Text className="text-center text-white">Done</Text>
          </Pressable>
        </View>
      </BottomModal>

      <BottomModal
        isVisible={genreModalVisible}
        setIsVisible={setGenreModalVisible}
        hasBackdrop={false}
      >
        <Text>Enter genre</Text>
        <TextInput
          value={genreValue}
          onChangeText={setGenreValue}
          placeholder="Enter platform here..."
          className="p-3  border w-full my-2 border-gray-300"
          style={{ borderRadius: 5 }}
          onSubmitEditing={handleSubmitGenre}
          autoCapitalize="none"
        />
        <ScrollView
          style={{ height: height * 0.2 }}
          showsVerticalScrollIndicator={false}
        >
          {tempGenreList.map((item, index) => (
            <View key={index} className="flex-row items-center">
              <Pressable onPress={() => onRemoveGenre(item)}>
                <Entypo name="minus" size={24} color="#CC481F" />
              </Pressable>
              <Text>{item}</Text>
            </View>
          ))}
        </ScrollView>
        <View className="justify-end">
          <Pressable
            className={`${
              tempGenreList.length === 0 ? "bg-[#cc471f3f]" : "bg-[#CC481F]"
            } py-4`}
            style={{ borderRadius: 5 }}
            onPress={handleDoneGenre}
            disabled={tempGenreList.length === 0}
          >
            <Text className="text-center text-white">Done</Text>
          </Pressable>
        </View>
      </BottomModal>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
