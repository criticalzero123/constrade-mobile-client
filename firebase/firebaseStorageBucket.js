import { storage } from "./firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 } from "uuid";

export const saveImagesProduct = async (imageList, title) => {
  const imagesUrlArray = [];
  for (let i = 0; i < imageList.length; i++) {
    const { uri } = imageList[i];
    const filename = uri.substring(uri.lastIndexOf("/") + 1);

    const imageRef = ref(
      storage,
      `product_images/${title + "_" + v4() + "_" + filename}`
    );

    const img = await fetch(uri);
    const bytes = await img.blob();

    const upload = await uploadBytes(imageRef, bytes);
    const imageUrl = await getDownloadURL(upload.ref);

    imagesUrlArray.push(imageUrl);
  }

  return imagesUrlArray;
};

export const saveImageProfile = async (image, userId) => {
  const uri = image;
  const imageRef = ref(storage, `user_images/${userId + "_" + v4()}`);

  const img = await fetch(uri);
  const bytes = await img.blob();

  const upload = await uploadBytes(imageRef, bytes);
  const imageUrl = await getDownloadURL(upload.ref);

  return imageUrl;
};

export const saveBackgroundImageProfile = async (image, userId) => {
  const uri = image;
  const imageRef = ref(
    storage,
    `background_user_images/${userId + "_" + v4()}`
  );

  const img = await fetch(uri);
  const bytes = await img.blob();

  const upload = await uploadBytes(imageRef, bytes);
  const imageUrl = await getDownloadURL(upload.ref);

  return imageUrl;
};
