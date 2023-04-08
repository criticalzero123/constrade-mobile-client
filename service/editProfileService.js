import * as ImagePicker from "expo-image-picker";
import { getFileInfo, isLessThanTheMB } from "./addProductService";

export const pickPhotoImage = async (setImagePhoto, isPremium) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: false,
    selectionLimit: 1, // only works in ios
    quality: 1,
    allowsEditing: false,
  });

  if (result.canceled) return;

  const maxSize = isPremium ? 20 : 4;

  const { uri } = result.assets[0];
  const fileInfo = await getFileInfo(uri);
  const isLimit = isLessThanTheMB(fileInfo.size, maxSize);

  if (uri.includes("gif") && !isPremium) {
    alert("You cant choose gif. Please subscribe to premium.");
    return;
  }

  if (!isLimit) {
    alert(
      `Image size must be smaller than 4mb. Subscribe to have a maximum of 20mb per upload.`
    );
    return;
  }

  setImagePhoto(uri);
};

export const pickBackgroundPhotoImage = async (
  setImagePhoto,
  isPremium,
  setSaveVisible,
  setBackgroundVisible
) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: false,
    selectionLimit: 1, // only works in ios
    quality: 1,
    allowsEditing: false,
  });

  if (result.canceled) return;

  const maxSize = isPremium ? 20 : 4;

  const { uri } = result.assets[0];
  const fileInfo = await getFileInfo(uri);
  const isLimit = isLessThanTheMB(fileInfo.size, maxSize);

  if (!isLimit) {
    alert(
      `Image size must be smaller than 4mb! or subscribe to have a maximum of 20mb per upload.`
    );
    return;
  }

  if (uri.includes("gif") && !isPremium) {
    alert("You cant choose gif. Please subscribe to premium.");
    return;
  }
  setSaveVisible(true);
  setImagePhoto(uri);
  setBackgroundVisible(false);
};
