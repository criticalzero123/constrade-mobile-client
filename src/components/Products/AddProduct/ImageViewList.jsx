import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import React from "react";
import ImageView from "./ImageView";
import { deleteImageList } from "../../../../service/addProductService";

export default function ImageViewList({ imageList, pickImage, setImageList }) {
  return (
    <View className={`flex-row items-center px-3 w-full h-full`}>
      {imageList.map((image, index) => (
        <ImageView
          image={image}
          key={index}
          onRemove={() => setImageList(deleteImageList(imageList, image))}
        />
      ))}

      {imageList.length === 0 ? (
        <Pressable
          onPress={pickImage}
          className=" w-full h-full items-center px-3 justify-center"
        >
          <Entypo name="images" size={30} color="gray" />
          <Text className="mt-3 mb-1 text-base font-semibold">
            Upload Photo
          </Text>
          <Text className="text-gray-500">You may select up to 5 photos.</Text>
        </Pressable>
      ) : (
        imageList.length !== 5 && (
          <Pressable
            onPress={pickImage}
            className="px-5 bg-gray-400 h-28 w-16 justify-center"
          >
            <Text className="text-center">+</Text>
          </Pressable>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
