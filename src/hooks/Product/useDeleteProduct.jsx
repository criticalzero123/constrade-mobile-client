import { StackActions, useNavigation } from "@react-navigation/native";
import { deleteProductById } from "../../../redux/actions/productActions";

export default function useDeleteProduct() {
  const navigation = useNavigation();
  const deleteProduct = async (productId) => {
    const res = await deleteProductById(productId);
    if (res) {
      alert("Successfully deleted!");
      navigation.dispatch(StackActions.replace("Menu"));
    } else {
      alert("Something went wrong in deleting");
    }
  };

  return [deleteProduct];
}
