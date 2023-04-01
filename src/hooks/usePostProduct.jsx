import { addProduct } from "../../redux/actions/productActions";
import { saveImagesProduct } from "../../firebase/firebaseStorageBucket";

export const usePostProduct = () => {
  const onListItem = async (imageList, productInfo) => {
    const imageUrlListBucket = await saveImagesProduct(
      imageList,
      productInfo.title
    );

    const productDetails = {
      ...productInfo,
      thumbnailUrl: imageUrlListBucket[0],
    };

    return addProduct(productDetails, imageUrlListBucket);
  };

  return [onListItem];
};
