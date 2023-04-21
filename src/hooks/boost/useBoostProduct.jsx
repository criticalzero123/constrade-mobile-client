import { useEffect } from "react";
import {
  addProductBoost,
  cancelProductBoost,
  getProductBoost,
} from "../../../redux/actions/productActions";
import { useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export default function useBoostProduct(id) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (id === undefined) return;

    const fetch = async () => {
      const res = await getProductBoost(id);

      setData(res);
    };
    fetch();
  }, [id]);

  const addBoost = async (days, userId) => {
    setLoading(true);
    const res = await addProductBoost(id, days, userId);

    if (res) {
      alert("Boosted");
      navigation.dispatch(
        StackActions.replace("ProductDetails", { productId: id })
      );
    } else {
      alert("Not enough balance for boosting.");
      setLoading(false);
    }
  };

  const cancelBoost = async (id) => {
    setLoading(true);
    Alert.alert(
      "Info",
      "Do you want to really cancel your boosting? This is not refundable as for moment.",
      [
        {
          text: "Yes",
          onPress: async () => {
            const res = await cancelProductBoost(id);
            if (res) {
              alert("Cancelled");
              navigation.dispatch(
                // StackActions.replace("ProductDetails", { productId: id })
                StackActions.replace("Menu", { productId: id })
              );
            } else {
              alert("Not enough balance for boosting.");
              setLoading(false);
            }
          },
        },
        {
          text: "Cancel",
          onPress: () => setLoading(false),
          style: "cancel",
        },
      ]
    );
  };

  return [data, addBoost, cancelBoost, loading];
}
