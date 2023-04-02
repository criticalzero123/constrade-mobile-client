import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import DiscoverHeader from "../../components/Home/DiscoverHeader";
import FlatListCategories from "../../components/Home/FlatListCategories";
import JustForYou from "../../components/Home/JustForYou";
import FeaturesList from "../../components/Home/FeaturesList";
import Advertisement from "../../components/Home/Advertisement";
import SuggestedCommunities from "../../components/Home/SuggestedCommunities";
import MightLikeThese from "../../components/Home/MightLikeThese";
import EndMessage from "../../components/EndMessage/EndMessage";
import { Ionicons } from "@expo/vector-icons";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import BottomModal from "../../components/modal/BottomModal";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";

export default function Discover() {
  useHideBottomTab(false);
  const { user } = useGetCurrentUser();
  const [search, setSearch] = useState("");
  const { height, width } = useWindowDimensions();
  const [visibleQr, setVisibleQr] = useState(false);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const handleBarCodeScanned = async ({ data }) => {
    setVisibleQr(!visibleQr);
    setScanned(true);
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      navigation.navigate("ProductDetails", { productId: parseInt(data) });
    }

    if (status === null) {
      alert(`Requesting for camera permission`);
      return;
    }
    if (status !== "granted") {
      alert(`No access to camera`);
      return;
    }
  };

  if (user === undefined)
    return (
      <View className="flex-row justify-center items-center flex-1">
        <ActivityIndicator />
      </View>
    );

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <DiscoverHeader />

          <View>
            <View
              className="py-4 px-4 rounded-lg bg-gray-200 mt-4 mb-3 flex-row items-center justify-between "
              style={{ marginHorizontal: 20 }}
            >
              {search.trim() === "" && (
                <Ionicons name="search-sharp" size={24} color="#CC481F" />
              )}
              <TextInput
                value={search}
                onChangeText={setSearch}
                className={`${search.trim() === "" && "ml-2 "} text-base w-3/4`}
                placeholder="Find console games"
                onSubmitEditing={() => {
                  setSearch("");
                  navigation.navigate("SearchResult", { query: search });
                }}
              />
              {search.trim() === "" && (
                <Pressable onPress={() => setVisibleQr(!visibleQr)}>
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={24}
                    color="gray"
                  />
                </Pressable>
              )}
            </View>

            <FeaturesList />
            <View className="my-3" />
            <MightLikeThese />

            <View className="my-2" />
            <FlatListCategories />

            <View className="my-2" />
            <JustForYou />

            <View className="my-4" />
            <Advertisement />

            <View className="my-2" />
            <SuggestedCommunities />

            <EndMessage
              text={
                "That's what we have for now. Maybe come back later for more awesome items!"
              }
            />
          </View>
        </ScrollView>
        <BottomModal setIsVisible={setVisibleQr} isVisible={visibleQr}>
          <View className="w-full items-center">
            {!scanned && (
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: height * 0.3, width: width * 0.5 }}
              />
            )}
            {scanned && (
              <Pressable
                onPress={() => setScanned(false)}
                className="p-4 bg-[#CC481F]"
                style={{ borderRadius: 10 }}
              >
                <Text className="text-center text-white">
                  Tap to scan again
                </Text>
              </Pressable>
            )}
          </View>
        </BottomModal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
