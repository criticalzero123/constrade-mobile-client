import { StyleSheet, View } from "react-native";

import React from "react";
import ImageViewList from "./ImageViewList";
import { pickProductImage } from "../../../../service/addProductService";

export default function ImagePickerProduct({ imageList, setImageList }) {
  return (
    <View
      className={`border-2 border-dashed border-gray-300 h-36 justify-center`}
    >
      <ImageViewList
        imageList={imageList}
        setImageList={setImageList}
        pickImage={() => pickProductImage(setImageList, imageList)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
