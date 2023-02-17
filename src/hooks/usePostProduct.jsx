import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/productActions";
import { saveImages } from "../../firebase/firebaseStorageBucket";

export const usePostProduct = () => {
  const { error, product, loading } = useSelector(
    (state) => state.addProductReducer
  );

  const dispatch = useDispatch();

  const onListItem = async (imageList, productInfo) => {
    const imageUrlListBucket = await saveImages(imageList, productInfo.title);

    const productDetails = {
      ...productInfo,
      thumbnailUrl: imageUrlListBucket[0],
    };

    dispatch(addProduct(productDetails, imageUrlListBucket));
  };

  return [onListItem, product, loading, error];
};
