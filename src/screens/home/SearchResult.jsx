import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useSearchHome from "../../hooks/home/useSearchHome";
import { ActivityIndicator } from "react-native-paper";
import ItemCard from "../../components/Products/ItemCard";
export default function SearchResult({ route }) {
  const { query } = route.params;

  const [result] = useSearchHome(query);

  if (result === undefined)
    return (
      <ContainerSafeView styleName="flex-row items-center justify-center">
        <ActivityIndicator />
      </ContainerSafeView>
    );

  if (result.products.length === 0)
    return (
      <ContainerSafeView>
        <HeaderArrow headerName={"Search results"} />
        <Text>No keyword is found at products</Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Search results"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {result.products.length !== 0 && (
          <View className="flex-row flex-wrap justify-between">
            {result.products.map((_data, index) => (
              <ItemCard data={_data} key={index} showLike={false} />
            ))}
          </View>
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
