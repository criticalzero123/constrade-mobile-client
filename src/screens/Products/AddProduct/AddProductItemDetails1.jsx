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
export default function AddProductItemDetails1({ route }) {
  const param = route.params;
  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [platformModalVisible, setPlatformModalVisible] = useState(false);

  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);

  const [condition, setCondition] = useState();
  const { height, width } = useWindowDimensions();

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"item details"} />
      <View className="flex-row items-center mb-2">
        <Text className="text-md font-semibold">PHP</Text>
        <Text className="text-[#087096] ml-2 font-semibold text-2xl">
          {param.data.value}
        </Text>
      </View>
      <View>
        <Text>Upload image</Text>
      </View>
      <Text>Condition</Text>

      <Pressable
        className="flex-row items-center justify-between p-3 border border-gray-300"
        onPress={() => setConditionModalVisible(!conditionModalVisible)}
        style={{ borderRadius: 10 }}
      >
        <Text className="text-gray-500">
          {condition
            ? itemConditionList.find((c) => c.id === condition).title
            : "Select condition"}
        </Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
      </Pressable>
      <View>
        <Text>Supported platforms</Text>
        <Pressable
          className="flex-row items-center"
          onPress={() => setPlatformModalVisible(!platformModalVisible)}
        >
          <MaterialIcons name="add" size={24} color="#CC481F" />
          <Text className="text-[#CC481F] ml-1 font-semibold">
            Add platform
          </Text>
        </Pressable>
      </View>
      <View>
        <Text>Description</Text>
        <TextInput
          className="border  align-text-top border-gray-300 p-3 "
          placeholder="People would likely to like the item that are well described."
          multiline
          style={{
            height: height * 0.2,
            textAlignVertical: "top",
            borderRadius: 5,
          }}
        />
      </View>
      <View className="flex-1 justify-end">
        <Pressable
          className="my-4 py-4 bg-[#CC481F]"
          style={{ borderRadius: 5 }}
        >
          <Text className="text-center text-white">Next step</Text>
        </Pressable>
      </View>

      <BottomModal
        isVisible={conditionModalVisible}
        setIsVisible={setConditionModalVisible}
      >
        <RadioButton.Group
          onValueChange={(value) => {
            setCondition(value);
            setConditionModalVisible(!conditionModalVisible);
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
      >
        <Text>Enter platform</Text>
        <TextInput
          value={item}
          onchangeText={setItem}
          placeholder="Enter platform here..."
          className="p-3  border w-full my-2 border-gray-300"
          style={{ borderRadius: 5 }}
        />
        <ScrollView
          style={{ height: height * 0.2 }}
          showsVerticalScrollIndicator={false}
        >
          <Text>ASDASDa</Text>
          <Text>ASDASDa</Text>
          <Text>ASDASDa</Text>
        </ScrollView>
        <View className="justify-end">
          <Pressable className="bg-[#CC481F] py-4" style={{ borderRadius: 5 }}>
            <Text className="text-center text-white">Done</Text>
          </Pressable>
        </View>
      </BottomModal>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
