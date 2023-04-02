import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getPopularProduct } from "../../../redux/actions/homeActions";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import ItemCard from "../../components/Products/ItemCard";

export default function PopularScreen() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getPopularProduct(10);

      setProducts(res);
    };

    fetch();
  }, []);

  if (products === undefined)
    return (
      <ContainerSafeView styleName={"items-center justify-center"}>
        <ActivityIndicator />
      </ContainerSafeView>
    );
  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Just for you"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {products.length !== 0 && (
          <View className="flex-row flex-wrap justify-between">
            {products.map((_data, index) => (
              <ItemCard data={_data} key={index} showLike={false} />
            ))}
          </View>
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
