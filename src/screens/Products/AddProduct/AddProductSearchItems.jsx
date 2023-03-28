import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AddProductSearchItems({ route }) {
  const param = route.params;
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (search.trim() !== "") {
      setSearch("");
      navigation.navigate("AddProductSearchResults", { search });
    } else alert("Please input something ");
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Search item"} />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search here..."
        onSubmitEditing={handleSubmit}
      />
      {/* {result &&
        (result.length === 0 ? (
          <View>
            <Text>No</Text>
          </View>
        ) : (
          <View>
            <Text>
              Accurate price prediction for you based on item condition and
              market value.
            </Text>
            <Text>Yes</Text>
          </View>
        ))} */}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
