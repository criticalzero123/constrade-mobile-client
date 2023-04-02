import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import { addReview } from "../../../redux/actions/reviewAction";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { StackActions, useNavigation } from "@react-navigation/native";
import { dynamicStar, getStar } from "../../../service/reviewService";

export default function AddReview({ route }) {
  const { reviewerId, transactionRefId, user } = route.params;
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
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
      {/* <TextInput
        value={rate}
        onChangeText={setRate}
        placeholder="Something here for rate"
        keyboardType="number-pad"
      /> */}
      <View className="items-center flex-1">
        <View className="mb-4 w-full flex-row justify-center mt-10 ">
          {dynamicStar(rate, setRate)}
        </View>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Additional comments..."
          className="w-full border border-gray-400 p-2 my-4"
          style={{
            height: height * 0.2,
            textAlignVertical: "top",
            borderRadius: 5,
          }}
        />
        <Pressable
          onPress={onPress}
          disabled={loading}
          className=" w-full bg-[#CC481F]  p-4 "
          style={{ borderRadius: 5 }}
        >
          <Text className="text-center text-white">
            {loading ? <ActivityIndicator /> : "Submit Review"}
          </Text>
        </Pressable>
      </View>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
