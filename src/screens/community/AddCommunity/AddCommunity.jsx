import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import useCommunity from "../../../hooks/community/useCommunity";

export default function AddCommunity() {
  const { user } = useGetCurrentUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-amazing-aerial-view-of-the-paradise-bora-bora-royalty-free-image-1620658687."
  );
  const [visibility, setVisibility] = useState("public");

  const { create } = useCommunity();

  const onPress = () => {
    const info = {
      ownerUserId: user.userId,
      name: name,
      description: description,
      imageUrl: image,
      visibility: visibility,
    };
    create(info);
  };

  return (
    <ContainerSafeView>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <Picker
        onValueChange={(item) => setVisibility(item)}
        selectedValue={visibility}
      >
        <Picker.Item value="public" label="Public" />
        <Picker.Item value="private" label="Private" />
      </Picker>

      <Pressable onPress={onPress} className="p-4 items-center bg-gray-300">
        <Text>Create</Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
