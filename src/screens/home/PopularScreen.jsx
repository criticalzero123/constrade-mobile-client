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
import { useHideBottomTab } from "../../hooks/useHideBottomTab";
import EndMessage from "../../components/EndMessage/EndMessage";
import { platformUniqueFilter } from "../../../service/filterService";
import { Picker } from "@react-native-picker/picker";

export default function PopularScreen() {
  useHideBottomTab();
  const [products, setProducts] = useState();
  const [platformList, setPlatformList] = useState([]);

  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await getPopularProduct(10);

      setPlatformList(["all", ...platformUniqueFilter(res)]);

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
        <View className="mb-5 border">
          <Picker
            selectedValue={platform}
            onValueChange={(itemValue) => setPlatform(itemValue)}
          >
            {platformList.map((item) => (
              <Picker.Item label={item} value={item} />
            ))}
          </Picker>
        </View>

        {products.length !== 0 && (
          <View className="flex-row flex-wrap justify-between">
            {platform === "all"
              ? products.map((_data, index) => (
                  <ItemCard data={_data} key={index} showLike={false} />
                ))
              : products
                  .filter((p) => p.platform.toLowerCase().includes(platform))
                  .map((_data, index) => (
                    <ItemCard data={_data} key={index} showLike={false} />
                  ))}
          </View>
        )}
        <EndMessage text={"Thats all for the popular products."} />
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
