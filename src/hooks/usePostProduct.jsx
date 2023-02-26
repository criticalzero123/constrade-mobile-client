import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/productActions";
import { saveImagesProduct } from "../../firebase/firebaseStorageBucket";

export const usePostProduct = () => {
  const { error, data, loading } = useSelector(
    (state) => state.addProductReducer
  );

  const dispatch = useDispatch();

  const onListItem = async (imageList, productInfo) => {
    const imageUrlListBucket = await saveImagesProduct(
      imageList,
      productInfo.title
    );

    const productDetails = {
      ...productInfo,
      thumbnailUrl: imageUrlListBucket[0],
    };

    dispatch(addProduct(productDetails, imageUrlListBucket));
  };

  return [onListItem, data, loading, error];
};
