import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Products/AddProduct/Header";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { RadioButton } from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/actions/productActions";
import { saveImages } from "../../../../firebase/firebaseStorageBucket";
import KeyboardHideView from "../../../components/CustomViews/KeyboardHideView";

export default function AddProductDeliveryDetails({ route }) {
  const [location, setLocation] = useState("");
  const [method, setMethod] = useState("");
  const [sending, setSending] = useState(false);

  const { productInfo, imageList } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onListItem = async () => {
    const imageUrlListBucket = await saveImages(imageList, productInfo.title);

    const productDetails = {
      ...productInfo,
      deliveryMethod: method,
      location: location,
      thumbnailUrl: imageUrlListBucket[0],
      dateCreated: new Date(),
    };

    dispatch(addProduct(productDetails, imageUrlListBucket));
  };

  return (
    <KeyboardHideView>
      <View>
        <Header onPress={() => navigation.goBack()} title="Delivery Method" />

        <View className="my-2"></View>

        <RadioButton.Group
          onValueChange={(value) => {
            setMethod(value);
          }}
          value={method}
        >
          <View className="flex-row items-center justify-between mb-5 ">
            <View className="flex-row">
              <MaterialCommunityIcons
                name="handshake-outline"
                size={24}
                color="gray"
              />
              <View className="ml-2">
                <Text className="font-semibold mb-1">Meetup</Text>
                <Text className="text-gray-400">
                  Meetup in a specific Location
                </Text>
              </View>
            </View>
            <RadioButton value="meetup" />
          </View>

          <View className="flex-row items-center justify-between mb-5 ">
            <View className="flex-row">
              <MaterialIcons name="delivery-dining" size={24} color="gray" />
              <View className="ml-2">
                <Text className="font-semibold mb-1">Deliver</Text>
                <Text className="text-gray-400">
                  Deliver through 3rd-party apps.
                </Text>
              </View>
            </View>
            <RadioButton value="deliver" />
          </View>
        </RadioButton.Group>

        <CustomTextInput
          valule={location}
          setValue={setLocation}
          placeholder="Please input the location"
          label="Location"
        />
      </View>
      <Pressable
        className="w-full bg-[#CC481F]  py-4 rounded mb-4"
        onPress={onListItem}
      >
        <Text className=" text-center text-white font-semibold text-base">
          List my item
        </Text>
      </Pressable>
    </KeyboardHideView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
});
