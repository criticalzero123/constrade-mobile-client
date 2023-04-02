import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import ItemCard from "../../components/Products/ItemCard";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";
import EndMessage from "../../components/EndMessage/EndMessage";
export default function BoostedScreen({ route }) {
  const { data } = route.params;
  useHideBottomTab();
  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"you might like these"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.length !== 0 && (
          <View className="flex-row flex-wrap justify-between">
            {data.map((_data, index) => (
              <ItemCard data={_data} key={index} showLike={false} />
            ))}
          </View>
        )}
        <EndMessage text={"Thats what we have for now for you."} />
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
