import * as ExpoImagePicker from "expo-image-picker";
import { getFileInfo, isLessThanTheMB } from "./addProductService";

export const pickPhotoImage = async (setImagePhoto) => {
  let result = await ExpoImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: false,
    selectionLimit: 1, // only works in ios
  });

  if (result.canceled) return;

  const { uri } = result.assets[0];
  const fileInfo = await getFileInfo(uri);
  const isLt4MB = isLessThanTheMB(fileInfo.size, 4);

  if (!isLt4MB) {
    alert(`Image size must be smaller than 4mb!`);
    return;
  }
  setImagePhoto(uri);
};
