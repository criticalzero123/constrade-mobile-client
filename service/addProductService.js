import * as FileSystem from "expo-file-system";
import * as ExpoImagePicker from "expo-image-picker";
import { ToastAndroid } from "react-native";

export const optionItem = [
  {
    id: 0,
    title: "Games",
    description: "Physical game copy",
    active: true,
  },
  {
    id: 1,
    title: "Accessories",
    description: "Game controllers, skins, and others",
    active: false,
  },
  {
    id: 2,
    title: "Console",
    description: "XBOX, Nintendo, and Playstation consoles",
    active: false,
  },
];

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

export const getFileInfo = async (fileURI) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  return fileInfo;
};

export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
  const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;

  return isOk;
};

export const pickProductImage = async (setImageList, imageList) => {
  let result = await ExpoImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    selectionLimit: 5, // only works in ios
  });

  if (result.canceled) return;
  if (result.assets.length > 5) {
    ToastAndroid.show("Select less than 5 images only", ToastAndroid.SHORT);
  } else {
    let flag = false;

    for await (const image of result.assets) {
      const { uri } = image;
      const fileInfo = await getFileInfo(uri);
      const isLt4MB = isLessThanTheMB(fileInfo.size, 4);

      if (!isLt4MB) {
        flag = true;
      }
    }

    if (flag) {
      alert(`Image size must be smaller than 4mb!`);
      return;
    }

    setImageList([...imageList, ...result.assets]);
  }
};
