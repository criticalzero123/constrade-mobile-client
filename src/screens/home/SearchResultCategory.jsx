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

export default function SearchResultCategory({ route }) {
  const { category } = route.params;
  useHideBottomTab();
  const [result, setResult] = useState();

  useEffect(() => {
    if (category === undefined) return;

    const fetch = async () => {
      const res = await getSearchCategory(category);

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
        <Text>No keyword is found at {category}</Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Search results"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {result.length !== 0 && (
          <View className="flex-row flex-wrap justify-between">
            {result.map((_data, index) => (
              <ItemCard data={_data} key={index} showLike={false} />
            ))}
          </View>
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
