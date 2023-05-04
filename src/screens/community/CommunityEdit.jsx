import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { TextInput } from "react-native-paper";
import useCommunity from "../../hooks/community/useCommunity";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function CommunityEdit({ route }) {
  const { data } = route.params;
  const navigation = useNavigation();
  const { edit } = useCommunity();
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [visibility, setVisibility] = useState(data.visibility);

  const onPress = async () => {
    const info = {
      ...data,
      name,
      description,
      visibility,
    };

    const res = await edit(info);

    if (res) {
      navigation.dispatch(StackActions.replace("MyCommunity"));
    } else {
      alert("Something went wrong in updating the community.");
    }
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
        <Text>Update</Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
