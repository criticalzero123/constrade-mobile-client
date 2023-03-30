import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import { itemConditionList } from "../../../../service/addProductService";
import BottomModal from "../../../components/modal/BottomModal";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImagePickerProduct from "../../../components/Products/AddProduct/ImagePickerProduct";
export default function AddProductItemDetails1({ route }) {
  //
  const { itemValue, genre, title, isGenerated, platform } = route.params.data;
  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [platformModalVisible, setPlatformModalVisible] = useState(false);

  const [item, setItem] = useState("");
  const [tempItemList, setTempItemList] = useState(platform ? [platform] : []);
  const [itemList, setItemList] = useState(platform ? [platform] : []);
  const [imageList, setImageList] = useState([]);

  const [cash, setCash] = useState(0);
  const [description, setDescription] = useState("");

  const [condition, setCondition] = useState();
  const [conditionInfo, setConditionInfo] = useState();

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const handleSubmit = () => {
    setItem("");
    setTempItemList([...tempItemList, item]);
  };

  const onRemove = (text) => {
    const filtered = tempItemList.filter((_p) => _p !== text);

    setTempItemList(filtered);
  };

  const handleDonePlatform = () => {
    setPlatformModalVisible(!platformModalVisible);
    setItemList(tempItemList);
  };

  const handleNext = () => {
    if (imageList.length < 2) {
      alert("Please put atleast 2 image");
      return;
    }
    if (condition === undefined) {
      alert("Please choose a condition");
      return;
    }
    if (description.trim() === "") {
      alert("Please describe your item");
      return;
    }

    const data = {
      value: itemValue,
      gameGenre: genre,
      title,
      condition: conditionInfo.value,
      cash,
      description,
      isGenerated,
      platform: itemList.toString(),
    };

    navigation.navigate("AddProductItemDetails2", { data, imageList });
  };
  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"item details"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="mb-2">
          <View className="flex-row items-center mb-2">
            <Text className="text-md font-semibold">PHP</Text>
            <Text className="text-[#087096] ml-2 font-semibold text-2xl">
              {conditionInfo ? cash : itemValue}
            </Text>
          </View>
          {conditionInfo && (
            <View className="flex-row">
              <Text className="mr-1 text-red-500 font-semibold">
                (-{conditionInfo.deduction * 100}%)
              </Text>
              <Text className="text-gray-500">{conditionInfo.title}</Text>
            </View>
          )}
        </View>
        <ImagePickerProduct imageList={imageList} setImageList={setImageList} />
        <View className="my-2">
          <Text className="mb-2 font-semibold text-base">Condition</Text>

          <Pressable
            className="flex-row items-center justify-between p-3 border border-gray-300"
            onPress={() => setConditionModalVisible(!conditionModalVisible)}
            style={{ borderRadius: 10 }}
          >
            <Text className="text-gray-500">
              {conditionInfo ? conditionInfo.title : "Select condition"}
            </Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </Pressable>
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
              {itemList.length === 0 ? "Add" : "Edit"} platform
            </Text>
          </Pressable>
          <View className="flex-row">
            {itemList.map(
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
            {itemList.length - 3 > 0 && (
              <Pressable
                onPress={() => setPlatformModalVisible(!platformModalVisible)}
                className="px-4 py-2 bg-[#CC481F] mr-2 "
                style={{ borderRadius: 1000 }}
              >
                <Text className="text-white">+{itemList.length - 3} more</Text>
              </Pressable>
            )}
          </View>
        </View>
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
        <View className="flex-1 justify-end">
          <Pressable
            className="my-4 py-4 bg-[#CC481F]"
            style={{ borderRadius: 5 }}
            onPress={handleNext}
          >
            <Text className="text-center text-white">Next step</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomModal
        isVisible={conditionModalVisible}
        setIsVisible={setConditionModalVisible}
      >
        <RadioButton.Group
          onValueChange={(value) => {
            const conditionItem = itemConditionList.find(
              (_p) => _p.id === value
            );
            setCondition(value);
            setConditionInfo(conditionItem);
            setConditionModalVisible(!conditionModalVisible);
            setCash(itemValue - itemValue * conditionItem.deduction);
          }}
          value={condition}
        >
          {itemConditionList.map((condition) => (
            <View
              key={condition.id}
              className="flex-row items-center justify-between my-2 w-full"
            >
              <View>
                <Text>{condition.title}</Text>
                <Text className="text-gray-400">{condition.description}</Text>
              </View>
              <RadioButton value={condition.id} />
            </View>
          ))}
        </RadioButton.Group>
      </BottomModal>
      <BottomModal
        isVisible={platformModalVisible}
        setIsVisible={setPlatformModalVisible}
        hasBackdrop={false}
      >
        <Text>Enter platform</Text>
        <TextInput
          value={item}
          onChangeText={setItem}
          placeholder="Enter platform here..."
          className="p-3  border w-full my-2 border-gray-300"
          style={{ borderRadius: 5 }}
          onSubmitEditing={handleSubmit}
        />
        <ScrollView
          style={{ height: height * 0.2 }}
          showsVerticalScrollIndicator={false}
        >
          {tempItemList.map((item, index) => (
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
              tempItemList.length === 0 ? "bg-[#cc471f3f]" : "bg-[#CC481F]"
            } py-4`}
            style={{ borderRadius: 5 }}
            onPress={handleDonePlatform}
            disabled={tempItemList.length === 0}
          >
            <Text className="text-center text-white">Done</Text>
          </Pressable>
        </View>
      </BottomModal>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
