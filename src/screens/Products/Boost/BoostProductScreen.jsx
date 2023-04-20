import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import useBoostProduct from "../../../hooks/boost/useBoostProduct";
import { useState } from "react";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import HeaderArrow from "../../../components/HeaderArrow/HeaderArrow";
import BottomModal from "../../../components/modal/BottomModal";
import { editProductBoost } from "../../../../redux/actions/productActions";
import { StackActions, useNavigation } from "@react-navigation/native";
export default function BoostProductScreen({ route }) {
  const { id } = route.params;
  const [data, submit, cancel, loading] = useBoostProduct(id);
  const [isVisible, setIsVisible] = useState(false);
  const [newDays, setNewDays] = useState(0);
  const [days, setDays] = useState(0);
  const { user } = useGetCurrentUser();

  const navigation = useNavigation();

  const onEditDays = async () => {
    let daysLeft =
      new Date(data.dateTimeExpired).getDate() - new Date().getDate();

    if (daysLeft <= newDays) {
      alert("More than days left! Please enter below days left");
      return;
    }

    const res = await editProductBoost(data.boostProductId, newDays);
    if (res) {
      alert("Change Successfully!");
      navigation.dispatch(
        StackActions.replace("ProductDetails", { productId: id })
      );
    }
    setIsVisible(!isVisible);
  };
  return (
    <ContainerSafeView>
      <HeaderArrow headerName="Boost Product" />

      {data !== undefined &&
        (data === null ? (
          <View className="mt-1 flex-1">
            <Text className="text-base mb-2">
              Please input number of days below:
            </Text>
            <TextInput
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
              placeholder="Enter days..."
              className="px-4 py-2 border border-gray-400"
              style={{ borderRadius: 5 }}
            />
            <View className="mt-5">
              <Text>
                Days boosted:{" "}
                <Text className="font-semibold text-base">{days}</Text>
              </Text>
              <Text className="my-2">
                Total amount to be paid:{" "}
                <Text className="font-semibold text-base">
                  {user.userType === "premium"
                    ? days * 5 - days * 5 * 0.15
                    : days * 5}
                </Text>
              </Text>
              {user.userType === "premium" && (
                <Text className="my-2">
                  Total saved because of premium:{" "}
                  <Text className="font-semibold text-base">
                    {days * 5 * 0.15}
                  </Text>
                </Text>
              )}
            </View>
            <View className="flex-1 justify-end mb-5 ">
              <Pressable
                className="p-4  bg-[#CC481F]"
                onPress={() => submit(days, user.userId)}
                disabled={loading}
                style={{ borderRadius: 5 }}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-center text-white font-semibold">
                    Submit
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        ) : (
          data.status === "active" && (
            <View>
              <Text>Days Boosted: {data.daysBoosted}</Text>
              <Text>Status: {data.status}</Text>
              <Text>
                DateTime Expired:{" "}
                {new Date(data.dateTimeExpired).toLocaleDateString()}
              </Text>
              <Text>
                Date Boosted: {new Date(data.dateBoosted).toLocaleDateString()}
              </Text>

              <Pressable
                className="p-4 border"
                onPress={() => setIsVisible(!isVisible)}
              >
                <Text className="text-center">Edit</Text>
              </Pressable>
              <Pressable
                className="p-4 border"
                onPress={() => cancel(data.boostProductId)}
              >
                <Text className="text-center">Cancel</Text>
              </Pressable>
              <BottomModal isVisible={isVisible} setIsVisible={setIsVisible}>
                <View className="w-full">
                  <Text>
                    Days Left:{" "}
                    {new Date(data.dateTimeExpired).getDate() -
                      new Date().getDate()}
                  </Text>
                  <TextInput
                    placeholder="Enter how many days for to be boosted.."
                    className="p-2 border border-gray-400 my-2"
                    style={{ borderRadius: 5 }}
                    value={newDays}
                    onChangeText={setNewDays}
                    keyboardType="numeric"
                  />
                </View>
                <Pressable
                  className="p-4 bg-[#CC481F]"
                  style={{ borderRadius: 5 }}
                  onPress={onEditDays}
                >
                  <Text className="text-center text-white font-semibold">
                    Done
                  </Text>
                </Pressable>
              </BottomModal>
            </View>
          )
        ))}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
