import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import useDeleteProduct from "../../../hooks/Product/useDeleteProduct";
import useProductReport from "../../../hooks/Product/useProductReport";
import { ReportEnum } from "../../../../service/enums";
import { addFavorite } from "../../../../redux/actions/productActions";
import { useState } from "react";
import useGetProductId from "../../../hooks/Product/useGetProductId";
export default function ProductDescription({ route }) {
  const { details } = route.params;

  const [deleteProductById] = useDeleteProduct();
  const { productReport } = useProductReport();
  const { isFavorite, setIsFavorite } = useGetProductId();
  const { user } = useGetCurrentUser();
  const { width, height } = useWindowDimensions();
  const [addingToFav, setAddingToFav] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const navigation = useNavigation();

  const onPressFavorite = async () => {
    if (user.userId !== details.product.posterUserId) {
      setAddingToFav(true);
      setAddFlag(!addFlag);

      const info = {
        productId: details.product.productId,
        UserId: user.userId,
        date: new Date(),
      };

      const flag = await addFavorite(info);
      if (flag) {
        alert("Added to Favorite!");
      } else {
        alert("Remove from favorite");
      }

      setIsFavorite(!isFavorite);
      setAddingToFav(false);
    }
  };

  const onPressReport = () => {
    const info = {
      reportedBy: user.userId,
      idReported: details.product.productId,
      reportType: ReportEnum.Product,
      description: "Something dummy coming from function",
      dateSubmitted: new Date(),
    };
    productReport(info);
  };

  const favoriteCount = (favCount) => {
    if (addFlag) {
      const _favoriteFlag = isFavorite ? 1 : -1;

      return favCount + _favoriteFlag;
    }

    return favCount;
  };

  return (
    <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
      <Text className="font-semibold text-lg">{details.product.title}</Text>

      <View className="flex-row justify-between items-center my-4">
        <View className="flex-row items-center">
          <Image
            source={{ uri: details.user.imageUrl }}
            style={{
              width: width * 0.07,
              height: height * 0.035,
              resizeMode: "contain",
            }}
            className="rounded-full mr-2"
          />

          <View>
            <Text className="capitalize font-semibold">
              {details.person.firstName} {details.person.lastName}
            </Text>
            <Text className="text-gray-500">{details.user.email}</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="flex-row items-center">
            <Text className={`text-base mr-2 ${isFavorite && "text-red-500"}`}>
              {favoriteCount(details.product.countFavorite)}
            </Text>
            {addingToFav ? (
              <ActivityIndicator />
            ) : (
              <Pressable onPress={onPressFavorite}>
                <AntDesign
                  name="hearto"
                  size={20}
                  color={isFavorite ? "red" : "black"}
                />
              </Pressable>
            )}
          </View>
          <View className="mx-2" />
          <Ionicons name="md-share-outline" size={24} color="black" />
        </View>
      </View>
      {details.product.productStatus === "unsold" ? (
        <Pressable
          className="mb-6"
          onPress={() =>
            navigation.navigate("Menu", {
              screen: "Message",
              params: {
                screen: "ProductMessage",
                params: { details: details },
              },
            })
          }
        >
          <Text>Make an Offer</Text>
        </Pressable>
      ) : (
        <View className="mb-6">
          <Text>Already sold</Text>
          <Pressable>
            <Text>Go to transaction</Text>
          </Pressable>
        </View>
      )}

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Item description</Text>
        <Text>{details.product.description}</Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Condition</Text>
        <Text>{details.product.condition}</Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Serial Number</Text>
        <Text>
          {details.product.serialNumber
            ? details.product.serialNumber
            : "No Serial Provided"}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Model Number</Text>
        <Text>
          {details.product.modelNumber
            ? details.product.modelNumber
            : "No Serial Provided"}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Game Genre</Text>
        <Text>{details.product.gameGenre}</Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2 ">Platform Supported</Text>
        <Text className="capitalize">{details.product.platform}</Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2 ">Date Posted</Text>
        <Text className="capitalize">
          {new Date(details.product.dateCreated).toLocaleDateString()}
        </Text>
      </View>

      {details.product.hasReceipts && (
        <View className="flex-row items-center">
          <Entypo name="check" size={15} color="rgb(34,197,94)" />
          <Text className="ml-1 text-green-700">Includes receipts</Text>
        </View>
      )}
      <View className="my-1" />
      {details.product.hasWarranty && (
        <View className="flex-row items-center">
          <Entypo name="check" size={15} color="rgb(34,197,94)" />
          <Text className="ml-1 text-green-700">Warranty available</Text>
        </View>
      )}

      {user.userId === details.product.posterUserId ? (
        details.product.productStatus === "unsold" ? (
          <>
            <Pressable
              className="w-full items-center p-4 bg-gray-500 my-4"
              onPress={() => deleteProductById(details.product.productId)}
            >
              <Text className="text-white">DELETE</Text>
            </Pressable>

            <Pressable
              className="w-full items-center p-4 bg-gray-500 my-4"
              onPress={() =>
                navigation.navigate("BoostProduct", {
                  id: details.product.productId,
                })
              }
            >
              <Text className="text-white">BOOST ITEM</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            className="w-full items-center p-4 bg-gray-500 my-4"
            onPress={() =>
              navigation.navigate("TransactionDetails", {
                id: details.product.productId,
              })
            }
          >
            <Text className="text-white">See transaction</Text>
          </Pressable>
        )
      ) : (
        <Pressable
          className="w-full items-center p-4 bg-gray-500 my-4"
          onPress={onPressReport}
        >
          <Text>REPORT</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
