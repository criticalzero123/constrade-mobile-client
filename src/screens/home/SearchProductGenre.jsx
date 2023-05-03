import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import useSearchGenre from "../../hooks/home/useSearchGenre";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import ItemCard from "../../components/Products/ItemCard";
import EndMessage from "../../components/EndMessage/EndMessage";
export default function SearchProductGenre({ route }) {
  const { name } = route.params;
  const [result, platformList] = useSearchGenre(name);
  const [platform, setPlatform] = useState("");

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
          No <Text className="font-semibold">{name}</Text> is found at this
          genre.
        </Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={`${name} results`} />
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
        <EndMessage text={"Thats all for the result."} />
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
