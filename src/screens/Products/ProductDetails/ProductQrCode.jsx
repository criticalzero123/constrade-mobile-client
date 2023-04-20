import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import QRCode from "react-native-qrcode-svg";
import logo from "../../../../assets/icon.png";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import LineTextCenter from "../../../components/line-text-center/LineTextCenter";

import { captureRef } from "react-native-view-shot";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef } from "react";

export default function ProductQrCode({ route }) {
  const { id, title } = route.params;
  const viewRef = useRef();
  const { height } = useWindowDimensions();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
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
      <HeaderArrow headerName={"QrCode"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View style={{ height: height * 0.7 }}>
            <View ref={viewRef} className="flex-1 bg-white">
              <View>
                <Text className="text-center font-semibold text-2xl text-gray-600 mt-5">
                  Scan QR code
                </Text>
                <Text className="text-center my-3 text-base text-gray-400">
                  Scan this QR code in-app to search easily.
                </Text>
              </View>
              <View className="flex-1 items-center justify-center ">
                <View>
                  <Text className=" text-center text-base text-gray-500">
                    Product Name
                  </Text>
                  <Text className="text-center mb-5 mt-1 text-lg font-semibold">
                    {title}
                  </Text>
                </View>
                <View
                  className="border border-gray-300 p-4"
                  style={{ borderRadius: 20 }}
                >
                  <QRCode
                    value={id.toString()}
                    logo={logo}
                    enableLinearGradient
                    linearGradient={["rgb(90,163,235)", "rgb(204,72,31)"]}
                    size={200}
                  />
                </View>
              </View>
            </View>
          </View>
          <LineTextCenter text={"or share this by downloading"} />
          <View className="flex-1 justify-end">
            <Pressable
              className="bg-[#CC481F] py-4 "
              style={{ borderRadius: 5 }}
              onPress={handleScreenshot}
            >
              <Text className="text-center text-white font-semibold">
                Download
              </Text>
            </Pressable>
          </View>
        </>
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
