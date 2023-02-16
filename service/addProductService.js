import * as ExpoImagePicker from "expo-image-picker";
import { ToastAndroid } from "react-native";

export const deleteItem = (itemList, item) => {
  const newItem = itemList.filter((_item) => _item !== item);

  return newItem;
};

export const deleteImageList = (imageList, image) => {
  const newImageList = imageList.filter(
    (_image) => _image.assetId !== image.assetId
  );

  return newImageList;
};

export const pickImage = async (setImageList, imageList) => {
  let result = await ExpoImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    selectionLimit: 5, // only works in ios
  });

  if (result.canceled) return;
  if (result.assets.length > 5) {
    ToastAndroid.show("Select less than 5 images only", ToastAndroid.SHORT);
  } else {
    setImageList([...imageList, ...result.assets]);
  }
};
