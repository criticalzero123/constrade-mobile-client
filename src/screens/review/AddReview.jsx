import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import { addReview } from "../../../redux/actions/reviewAction";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function AddReview({ route }) {
  const { reviewerId, transactionRefId, user } = route.params;
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onPress = async () => {
    if (rate === 0 || description.trim() === "") {
      alert("Please input rate or description");
      return;
    }
    setLoading(true);
    const info = {
      transactionRefId,
      description,
      rate: parseInt(rate),
      dateCreated: new Date(),
    };
    const res = await addReview(reviewerId, info);

    if (res) {
      alert("Successfully added");
      setLoading(false);
      navigation.dispatch(StackActions.replace("Reviews", { user }));
    } else {
      setLoading(false);
      alert("Not succesfully added");
    }
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Add review"} />
      <TextInput
        value={rate}
        onChangeText={setRate}
        placeholder="Something here for rate"
        keyboardType="number-pad"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Something here"
      />
      <Pressable onPress={onPress} disabled={loading}>
        <Text className="text-center p-4 border border-gray-500">
          {loading ? <ActivityIndicator /> : "Submit Review"}
        </Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
