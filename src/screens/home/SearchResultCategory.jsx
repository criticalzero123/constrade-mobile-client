import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import { useEffect } from "react";
import { getSearchCategory } from "../../../redux/actions/homeActions";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { ActivityIndicator } from "react-native-paper";
import ItemCard from "../../components/Products/ItemCard";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";
import { platformUniqueFilter } from "../../../service/filterService";
import { Picker } from "@react-native-picker/picker";

export default function SearchResultCategory({ route }) {
  const { category } = route.params;
  useHideBottomTab();
  const [result, setResult] = useState();
  const [platformList, setPlatformList] = useState([]);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    if (category === undefined) return;

    const fetch = async () => {
      const res = await getSearchCategory(category);
      setPlatformList(["all", ...platformUniqueFilter(res)]);

      setResult(res);
    };

    fetch();
  }, []);

  if (result === undefined)
    return (
      <ContainerSafeView styleName="flex-row items-center justify-center">
        <ActivityIndicator />
      </ContainerSafeView>
    );

  if (result.length === 0)
    return (
      <ContainerSafeView>
        <HeaderArrow headerName={"Search results"} />
        <Text>
          No Product is found at{" "}
          <Text className="font-semibold capitalize">{category}</Text>
        </Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Search results"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-5 border rounded border-gray-400">
          <Picker
            selectedValue={platform}
            onValueChange={(itemValue) => setPlatform(itemValue)}
          >
            {platformList.map((item, index) => (
              <Picker.Item label={item} value={item} key={index} />
            ))}
          </Picker>
        </View>
        {result.length !== 0 && (
          <View className="flex-row flex-wrap justify-between">
            {platform === "all"
              ? result.map((_data, index) => (
                  <ItemCard data={_data} key={index} showLike={false} />
                ))
              : result
                  .filter((p) => p.platform.toLowerCase().includes(platform))
                  .map((_data, index) => (
                    <ItemCard data={_data} key={index} showLike={false} />
                  ))}
          </View>
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
