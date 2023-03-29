import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import Header from "../../../components/Products/AddProduct/Header";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { Modal, Portal, Provider } from "react-native-paper";
import KeyboardHideView from "../../../components/CustomViews/KeyboardHideView";
import { usePostProduct } from "../../../hooks/usePostProduct";
import Checkbox from "expo-checkbox";

export default function AddProductDeliveryDetails({ route }) {
  const { data, imageList } = route.params;
  const [location, setLocation] = useState("");
  const [isDelivery, setIsDelivery] = useState(false);
  const [isMeetup, setIsMeetup] = useState(false);
  const [sending, setSending] = useState(false);
  const [onListItem] = usePostProduct();

  const navigation = useNavigation();

  const onSubmit = async () => {
    setSending(true);
    if (!isDelivery && !isMeetup) {
      alert("Please select a delivery method details");
      return;
    }

    if (location.trim() === "") {
      alert("Please put a location details");
      return;
    }

    const productDetails = {
      ...data,
      isDelivery,
      isMeetup,
      location: location,
      dateCreated: new Date(),
    };

    const _result = await onListItem(imageList, productDetails);

    if (Number.isInteger(_result)) {
      navigation.dispatch(
        StackActions.replace("ProductDetails", {
          productId: parseInt(_result),
        })
      );
    } else if (_result === "NoPostCount") {
      alert("You dont have any count post");
    } else if (_result === "NotVerified") {
      alert("You are not verified");
    }

    setSending(false);
  };

  return (
    <Provider>
      <KeyboardHideView>
        <View className="h-full">
          <Header onPress={() => navigation.goBack()} title="Delivery Method" />

          <View className="my-2"></View>

          <View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-semibold mb-2">Meetup</Text>
              </View>
              <Checkbox value={isMeetup} onValueChange={setIsMeetup} />
            </View>
            <View className="my-2"></View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-semibold mb-2">Deliver</Text>
              </View>
              <Checkbox value={isDelivery} onValueChange={setIsDelivery} />
            </View>
          </View>

          <CustomTextInput
            valule={location}
            setValue={setLocation}
            placeholder="Please input the location"
            label="Location"
          />

          <Pressable
            className={`w-full ${
              sending ? "bg-[#e48568] " : "bg-[#CC481F] "
            }  py-4 rounded mb-4 flex-row items-center justify-center bottom-0 absolute`}
            onPress={onSubmit}
            disabled={
              sending || (!isDelivery && !isMeetup && location.trim() === "")
            }
          >
            <Text className=" text-white font-semibold text-base">
              {sending && <ActivityIndicator />}List my item
            </Text>
          </Pressable>
        </View>

        <Portal>
          <Modal
            visible={sending}
            contentContainerStyle={styles.containerStyle}
          >
            <ActivityIndicator size={"large"} />
          </Modal>
        </Portal>
      </KeyboardHideView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    height: "20%",
    marginHorizontal: 20,
  },
});
