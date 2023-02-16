import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { deleteItem } from "../../../../service/addProductService";

export default function ViewItemList({ itemList, setItemList }) {
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
              onPress={() => setItemList(deleteItem(itemList, item))}
              className="px-2 py-1 bg-gray-400 ml-2 rounded-full"
            >
              <Text className="">X</Text>
            </Pressable>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({});
