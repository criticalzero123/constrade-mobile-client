import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { submitSystemFeedback } from "../../../redux/actions/systemFeedbackAction";

export default function SubmitFeedback() {
  const { user } = useGetCurrentUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("bug");

  const onPressSubmit = () => {
    const info = {
      userId: user.userId,
      title: title,
      description: description,
      reportType: reportType,
      dateSubmitted: new Date(),
    };

    submitSystemFeedback(info);
  };

  return (
    <ContainerSafeView>
      <TextInput
        value={title}
        onChangeText={setTitle}
        className="p-2 border"
        placeholder="Title"
      />
      <TextInput
        value={description}
        multiline
        onChangeText={setDescription}
        className="p-2 border"
        placeholder="Description"
      />
      <Picker
        selectedValue={reportType}
        onValueChange={(item) => setReportType(item)}
      >
        <Picker.Item value="bug" label="Bug" />
        <Picker.Item value="suggestion" label="Suggestion" />
      </Picker>
      <Pressable
        className="p-2 bg-gray-400 items-center"
        onPress={onPressSubmit}
      >
        <Text>Submit</Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
