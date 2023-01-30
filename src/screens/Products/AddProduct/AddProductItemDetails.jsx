import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function AddProductItemDetails() {
  const [imageList, setImageList] = useState([]);
  const navigation = useNavigation();

  const pickImage = async () => {
    console.log("pressed");
    let result = await ImagePicker.launchImageLibraryAsync({
      //   allowsEditing: true,
      //   aspect: [4, 3],
      //   quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) return;
    if (result.assets.length > 5) {
      ToastAndroid.show("Select atleast 5 images only", ToastAndroid.SHORT);
      return;
    }

    setImageList(result.assets);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
      style={styles.container}
    >
      <View className="flex-row items-center mt-2">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Pressable>
        <Text className="ml-3 text-base font-semibold">Item Details</Text>
      </View>

      <View className="my-2"></View>

      <ScrollView>
        {/* For the image picker */}
        <Pressable
          onPress={pickImage}
          className="border-2 border-dashed items-center border-gray-300 p-5"
        >
          <Entypo name="images" size={30} color="gray" />
          <Text className="mt-3 mb-1 text-base font-semibold">
            Upload Photo
          </Text>
          <Text className="text-gray-500">You may select up to 5 photos.</Text>
        </Pressable>
        {/*  */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
});
