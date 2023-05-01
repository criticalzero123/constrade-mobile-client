import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import useSearchHome from "../../hooks/home/useSearchHome";
import { ActivityIndicator } from "react-native-paper";
import ItemCard from "../../components/Products/ItemCard";
import EndMessage from "../../components/EndMessage/EndMessage";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";
export default function SearchResult({ route }) {
  useHideBottomTab();
  const { query } = route.params;

  const [result, platformList] = useSearchHome(query);
  const [platform, setPlatform] = useState("");

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
        <Text>
          No <Text className="font-semibold">{query}</Text> is found at products
        </Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={`${query} results`} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-5 border">
          <Picker
            selectedValue={platform}
            onValueChange={(itemValue) => setPlatform(itemValue)}
          >
            {platformList.map((item, index) => (
              <Picker.Item label={item} value={item} key={index} />
            ))}
          </Picker>
        </View>
        {result.products.length !== 0 && (
          <View className="flex-row flex-wrap justify-between">
            {platform === "all"
              ? result.products.map((_data, index) => (
                  <ItemCard data={_data} key={index} showLike={false} />
                ))
              : result.products
                  .filter((p) => p.platform.toLowerCase().includes(platform))
                  .map((_data, index) => (
                    <ItemCard data={_data} key={index} showLike={false} />
                  ))}
          </View>
        )}
        <EndMessage text={"Thats all for the result."} />
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
