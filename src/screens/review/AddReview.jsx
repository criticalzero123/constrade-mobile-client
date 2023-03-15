import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import { addReview } from "../../../redux/actions/reviewAction";

export default function AddReview({ route }) {
  const { reviewerId, transactionRefId } = route.params;
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  //   public int ReviewId { get; set; }
  //   public int TransactionRefId { get; set; }
  //     public string Description {get; set;}
  //   public short Rate { get; set; }
  //   public DateTime DateCreated { get; set; }

  const onPress = () => {
    if (rate === 0 || description.trim() === "") {
      alert("Please input rate or description");
      return;
    }

    const info = {
      transactionRefId,
      description,
      rate: parseInt(rate),
      dateCreated: new Date(),
    };
    addReview(reviewerId, info);
  };

  return (
    <ContainerSafeView>
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
      <Pressable onPress={onPress}>
        <Text className="text-center p-4 border border-gray-500">
          Submit Review
        </Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
