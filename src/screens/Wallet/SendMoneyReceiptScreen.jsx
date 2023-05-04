import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import Advertisement from "../../components/Home/Advertisement";
import { StackActions, useNavigation } from "@react-navigation/native";
import { getDateFull } from "../../../service/dateService";
import { captureRef } from "react-native-view-shot";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef } from "react";

export default function SendMoneyReceiptScreen({ route }) {
  const { data } = route.params;
  const { person } = useGetCurrentUser();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const viewRef = useRef();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const TextContainer = ({ textL, textR }) => {
    return (
      <View className="flex-row justify-between mx-10 my-1">
        <Text className="text-gray-400 text-base">{textL}</Text>
        <Text className="text-gray-200 text-lg font-semibold capitalize">
          {textR}
        </Text>
      </View>
    );
  };
  console.log(data);
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
    <ContainerSafeView>
      <View style={{ height: height * 0.1 }}></View>
      <View
        className="bg-gray-800 relative mb-5"
        style={{ height: height * 0.6, borderRadius: 20 }}
        ref={viewRef}
      >
        <View
          className="absolute -top-16 px-7 py-8 flex-row justify-center items-center"
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
        <View className="mt-24 mb-10">
          <Text className="text-white text-center text-2xl font-semibold">
            Transfer Success!
          </Text>
          <Text className="text-gray-400 text-center mt-1 text-base font-semibold">
            Here are your invoice, thank you!
          </Text>
          <View className="my-5 border-t border-t-gray-400 border-dashed" />
          <TextContainer
            textL="Transfer Date"
            textR={getDateFull(new Date())}
          />
          <TextContainer
            textL="Receiver"
            textR={data.person.firstName + " " + data.person.lastName}
          />
          <TextContainer
            textL="Sender"
            textR={person.firstName + " " + person.lastName}
          />
          <TextContainer textL="Amount" textR={data.amount} />
          <TextContainer textL="Additional Fee" textR={"0"} />
        </View>
        <Advertisement />
      </View>

      <View style={{ height: height * 0.26 }} className="justify-end">
        <Pressable
          className="border border-[#CC481F] py-4 mb-3"
          style={{ borderRadius: 5 }}
          onPress={handleScreenshot}
        >
          <Text className="text-center text-[#CC481F] font-semibold">
            Download receipt
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.dispatch(StackActions.replace("Wallet"))}
        >
          <Text
            className="w-full p-4 bg-[#CC481F] text-white text-center font-semibold text-base"
            style={{ borderRadius: 10 }}
          >
            Done
          </Text>
        </Pressable>
      </View>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
