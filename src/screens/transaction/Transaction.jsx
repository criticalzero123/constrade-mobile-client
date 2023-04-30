import {
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useEffect, useRef } from "react";
import { getProductTransaction } from "../../../redux/actions/transactionAction";
import { useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";

import { captureRef } from "react-native-view-shot";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Transaction({ route }) {
  const { id } = route.params;
  const [transaction, setTransaction] = useState();
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const viewRef = useRef();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (id === undefined) return;

    const fetch = async () => {
      const result = await getProductTransaction(id);

      if (result) {
        setTransaction(result);
      } else {
        alert("Something went wrong in fetching transaction");
      }
    };

    fetch();
  }, [id]);

  if (transaction === undefined) return <Text>Fetching...</Text>;

  const TextContainer = ({
    leftText,
    rightText,
    onPressTitle,
    isTitle = false,
  }) => {
    return (
      <View className="flex-row items-center justify-between my-2">
        <Text className="text-gray-500">{leftText}</Text>
        <Text
          className={`capitalize font-semibold ${isTitle && "text-[#CC481F]"}`}
          onPress={isTitle && onPressTitle}
        >
          {rightText}
        </Text>
      </View>
    );
  };

  const transactedWith = () => {
    if (transaction.product.item === "") return "₱" + transaction.product.cash;
    if (transaction.product.cash === 0) return transaction.product.item;

    return transaction.product.item + " & " + "₱" + transaction.product.cash;
  };

  const handleScreenshot = async () => {
    try {
      // ask for permission to use the camera
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        // capture the screenshot
        const uri = await captureRef(viewRef.current, {
          format: "png",
          quality: 1,
        });

        await requestPermission();
        // save the screenshot to the device's photo library
        await MediaLibrary.saveToLibraryAsync(uri);
        alert("Screenshot saved to photo library!");
      } else {
        alert("Permission to use camera denied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerSafeView styleName={"bg-white"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="items-center justify-end relative"
          style={{ height: height * 0.25 }}
        >
          <View
            className="absolute px-7 py-8 bottom-10 flex-row justify-center items-center"
            style={{
              borderRadius: 1000,
              marginLeft: width * 0.27,
              backgroundColor: "rgba(0, 255, 0, 0.08)",
            }}
          >
            <Text
              className="text-white text-6xl px-3 py-4 bg-gray-500 text-center"
              style={{
                borderRadius: 1000,
                backgroundColor: "rgba(0, 255, 0, 0.2)",
              }}
            >
              <MaterialCommunityIcons name="check" size={70} color="white" />
            </Text>
          </View>
          <Text className="text-2xl font-semibold">Transaction Success</Text>
        </View>
        <View style={{ height: height * 0.75 }}>
          <View className="items-center pt-10" style={{ height: height * 0.5 }}>
            <View
              className="w-full bg-gray-100 p-4"
              style={{ borderRadius: 10 }}
              ref={viewRef}
            >
              <TextContainer
                leftText={"Reference No.:"}
                rightText={transaction.transaction.transactionId}
              />
              <TextContainer
                leftText={"Product Name:"}
                rightText={transaction.product.title}
                isTitle
                onPressTitle={() =>
                  navigation.dispatch(
                    StackActions.replace("ProductDetails", {
                      productId: transaction.product.productId,
                    })
                  )
                }
              />
              <TextContainer
                leftText={"Transaction Type:"}
                rightText={transaction.product.preferTrade}
              />
              <TextContainer
                leftText={"Traded with:"}
                rightText={transactedWith()}
              />
              <TextContainer
                leftText={"Buyer"}
                rightText={
                  transaction.buyer.person.firstName +
                  " " +
                  transaction.buyer.person.lastName
                }
              />

              <TextContainer
                leftText={"Seller"}
                rightText={
                  transaction.seller.person.firstName +
                  " " +
                  transaction.seller.person.lastName
                }
              />
              <TextContainer
                leftText={"Date transacted"}
                rightText={new Date(
                  transaction.transaction.dateTransaction
                ).toLocaleDateString()}
              />
              <TextContainer
                leftText={"Time transacted"}
                rightText={new Date(
                  transaction.transaction.dateTransaction
                ).toLocaleTimeString()}
              />
            </View>
          </View>
          <View className="justify-end" style={{ height: height * 0.25 }}>
            <Pressable
              className="border border-[#CC481F] py-4"
              style={{ borderRadius: 5 }}
              onPress={handleScreenshot}
            >
              <Text className="text-center text-[#CC481F] font-semibold">
                Download receipt
              </Text>
            </Pressable>
            <Pressable
              className="bg-[#CC481F] py-4 my-2  mb-5"
              style={{ borderRadius: 5 }}
              onPress={() => navigation.goBack()}
            >
              <Text className="text-center text-white">Back</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
