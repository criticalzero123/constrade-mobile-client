import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Products/AddProduct/Header";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { Modal, Portal, Provider } from "react-native-paper";
import KeyboardHideView from "../../../components/CustomViews/KeyboardHideView";
import { usePostProduct } from "../../../hooks/usePostProduct";
import { useEffect } from "react";
import DeliveryOptions from "../../../components/Products/AddProduct/DeliveryOptions";

export default function AddProductDeliveryDetails({ route }) {
  const [location, setLocation] = useState("");
  const [method, setMethod] = useState("");
  const [sending, setSending] = useState(false);
  const [onListItem, data, loading, error] = usePostProduct();

  const { productInfo, imageList } = route.params;
  const navigation = useNavigation();

  const onSubmit = () => {
    if (method.trim() === "") {
      alert("Please select a delivery method details");
      return;
    }

    if (location.trim() === "") {
      alert("Please put a location details");
      return;
    }

    setSending(!sending);

    const productDetails = {
      ...productInfo,
      deliveryMethod: method,
      location: location,
      dateCreated: new Date(),
    };

    onListItem(imageList, productDetails);
  };

  useEffect(() => {
    if (loading === undefined) return;
    if (!loading) setSending(!sending);
    if (error !== undefined) console.log(error);
  }, [loading]);

  return (
    <Provider>
      <KeyboardHideView>
        <View className="h-full">
          <Header onPress={() => navigation.goBack()} title="Delivery Method" />

          <View className="my-2"></View>

          <DeliveryOptions
            setMethod={(value) => {
              setMethod(value);
            }}
            method={method}
          />

          <CustomTextInput
            valule={location}
            setValue={setLocation}
            placeholder="Please input the location"
            label="Location"
          />
          {data === "NoPostCount" ? (
            <Text>Count Post is not enough</Text>
          ) : (
            data !== undefined && <Text>Product is posted</Text>
          )}
          <Pressable
            className={`w-full ${
              sending ? "bg-[#e48568] " : "bg-[#CC481F] "
            }  py-4 rounded mb-4 flex-row items-center justify-center bottom-0 absolute`}
            onPress={onSubmit}
            disabled={sending}
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
