import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import useCommunity from "../../../hooks/community/useCommunity";
import { useHideBottomTab } from "../../../hooks/useHideBottomTab";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function AddCommunity() {
  useHideBottomTab();
  const { user } = useGetCurrentUser();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-amazing-aerial-view-of-the-paradise-bora-bora-royalty-free-image-1620658687."
  );
  const [visibility, setVisibility] = useState("public");

  const { create } = useCommunity();

  const onPress = async () => {
    setLoading(true);
    const info = {
      ownerUserId: user.userId,
      name: name,
      description: description,
      imageUrl: image,
      visibility: visibility,
    };
    const res = await create(info);
    if (res.toString().toLowerCase().includes("success")) {
      navigation.dispatch(StackActions.replace("MyCommunity"));
    } else {
      alert(res);
    }
    setLoading(false);
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
        {/* <Picker.Item value="private" label="Private" /> */}
      </Picker>

      <Pressable
        onPress={onPress}
        className="p-4 items-center bg-gray-300"
        disabled={loading}
      >
        {loading ? <ActivityIndicator /> : <Text>Create</Text>}
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
