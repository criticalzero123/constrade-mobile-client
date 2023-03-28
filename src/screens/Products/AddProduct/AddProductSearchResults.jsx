import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useProductPrice from "../../../hooks/Product/useProductPrice";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
export default function AddProductSearchResults({ route }) {
  const { search } = route.params;
  const [results] = useProductPrice(search);

  const getHighlightedText = (text, highlight) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <Text className="flex-row text-base  ">
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text className="font-semibold" key={index}>
              {part}
            </Text>
          ) : (
            <Text className="text-gray-500" key={index}>
              {part}
            </Text>
          )
        )}
      </Text>
    );
  };

  const ResultItem = ({ name }) => {
    return (
      <View className="flex-row items-center justify-between p-2">
        <Text>{getHighlightedText(name, search)}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
      </View>
    );
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={search} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {results ? (
          results.length === 0 ? (
            <View>
              <Text>No</Text>
            </View>
          ) : (
            results.map((r, index) => (
              <ResultItem name={r.name.toLowerCase()} key={index} />
            ))
          )
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
