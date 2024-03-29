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
import ProductImageDisplayList from "./ProductImageDisplayList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  itemConditionList,
  stringToArrayList,
} from "../../../../service/addProductService";
import { Feather } from "@expo/vector-icons";
export default function ProductDescription() {
  const [deleteProductById] = useDeleteProduct();
  const { productReport } = useProductReport();
  const { data, isFavorite, setIsFavorite } = useGetProductId();
  const { user } = useGetCurrentUser();
  const { width, height } = useWindowDimensions();
  const [addingToFav, setAddingToFav] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [imageDisplay, setImageDisplay] = useState(
    data && data.product.thumbnailUrl
  );
  const navigation = useNavigation();

  const onPressFavorite = async () => {
    if (user.userId !== data.product.posterUserId) {
      setAddingToFav(true);
      setAddFlag(!addFlag);

      const info = {
        productId: data.product.productId,
        UserId: user.userId,
        date: new Date(),
      };

      const flag = await addFavorite(info);
      // if (flag) {
      //   alert("Added to Favorite!");
      // } else {
      //   alert("Remove from favorite");
      // }

      setIsFavorite(!isFavorite);
      setAddingToFav(false);
    }
  };

  const onPressReport = () => {
    const info = {
      reportedBy: user.userId,
      idReported: data.product.productId,
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

  const handleGoToProfile = () => {
    if (data.user.userId === user.userId) {
      navigation.navigate("Menu", {
        screen: "User",
        params: {
          screen: "UserProfile",
        },
      });
    } else {
      navigation.navigate("Menu", {
        screen: "User",
        params: {
          screen: "OtherUserProfile",
          params: { userId: data.user.userId },
        },
      });
    }
  };

  const navigateTo = (tag, type) => {
    if (type === "genre") {
      navigation.navigate("SearchResultGenre", { name: tag });
    } else {
      navigation.navigate("SearchResultPlatform", {
        name: tag,
      });
    }
  };

  const TagsDisplay = ({ tags, type }) => {
    const tagArray = stringToArrayList(tags);
    return (
      <View className="flex-row gap-x-4 flex-wrap w-full ">
        {tagArray.map((tag, index) => (
          <Pressable
            key={index}
            className="py-2 px-4 rounded bg-[#CC481F]"
            onPress={() => navigateTo(tag, type)}
          >
            <Text className="text-white">{tag}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
      <Image
        style={{ height: height * 0.3 }}
        className="w-full"
        source={{
          uri: imageDisplay ? imageDisplay : data.product.thumbnailUrl,
        }}
      />
      <ProductImageDisplayList
        images={data && data.images}
        setImageDisplay={setImageDisplay}
      />
      <Text className="font-semibold text-lg mt-5">{data.product.title}</Text>

      <View className="flex-row justify-between items-center my-4">
        <View className="flex-row items-center">
          <View
            className="overflow-hidden mr-2"
            style={{
              borderRadius: 1000,
              width: width * 0.07,
              height: height * 0.035,
            }}
          >
            <Image
              source={{ uri: data.user.imageUrl }}
              style={{
                width: width * 0.07,
                height: height * 0.035,
                resizeMode: "cover",
              }}
            />
          </View>
          <View>
            <Pressable onPress={handleGoToProfile}>
              <Text className="capitalize font-semibold">
                {data.person.firstName} {data.person.lastName}
              </Text>
            </Pressable>
            <Text className="text-gray-500">{data.user.email}</Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="flex-row items-center">
            <Text className={`text-base mr-2 ${isFavorite && "text-red-500"}`}>
              {!addingToFav && favoriteCount(data.product.countFavorite)}
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
          <Pressable
            onPress={() =>
              navigation.navigate("ProductQR", {
                id: data.product.productId,
                title: data.product.title,
              })
            }
          >
            <Ionicons name="md-share-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      {data.product.hasReceipts && (
        <View className="flex-row items-center my-3">
          <Entypo name="check" size={15} color="rgb(34,197,94)" />
          <Text className="ml-1 text-green-700">Includes receipts</Text>
        </View>
      )}
      <View className="my-1" />
      {data.product.hasWarranty && (
        <View className="flex-row items-center">
          <Entypo name="check" size={15} color="rgb(34,197,94)" />
          <Text className="ml-1 text-green-700">Warranty available</Text>
        </View>
      )}

      <View className="flex-row items-center">
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={22}
          color="gray"
        />
        <Text className="ml-2">
          {data.product.modelNumber
            ? data.product.modelNumber
            : "No model number Provided"}
        </Text>
      </View>

      <View className="flex-row items-center mt-1 mb-5">
        <MaterialIcons name="bar-chart" size={24} color="gray" />
        <Text className="ml-2">
          {data.product.serialNumber
            ? data.product.serialNumber
            : "No serial number Provided"}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Item description</Text>
        <Text>{data.product.description}</Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Condition</Text>
        <Text>
          {
            itemConditionList.find((c) => c.value === data.product.condition)
              .title
          }
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Game Genre</Text>
        <TagsDisplay tags={data.product.gameGenre} type={"genre"} />
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 mb-2 ">Platform Supported</Text>
        <TagsDisplay tags={data.product.platform} type={"platform"} />
      </View>
      {user.userId === data.product.posterUserId ? (
        data.product.productStatus === "unsold" ? (
          <>
            <Pressable
              className={`${
                data.isBoosted ? "border border-[#CC481F] " : "bg-[#CC481F]"
              } w-full items-center p-4 my-4`}
              onPress={() =>
                navigation.navigate("BoostProduct", {
                  id: data.product.productId,
                })
              }
              style={{ borderRadius: 5 }}
            >
              <Text
                className={`${
                  data.isBoosted ? "text-[#CC481F]" : "text-white"
                } font-semibold`}
              >
                {data.isBoosted ? "Boosted" : "Boost Item"}
              </Text>
            </Pressable>

            <Pressable
              className="w-full items-center p-4 bg-[#CC481F] mb-4 font-semibold"
              onPress={() =>
                navigation.navigate("UpdateProduct", { product: data.product })
              }
              style={{ borderRadius: 5 }}
            >
              <Text className="text-white">Edit</Text>
            </Pressable>

            <Pressable
              className="w-full items-center p-4 bg-[#CC481F] mb-4 font-semibold"
              onPress={() => deleteProductById(data.product.productId)}
              style={{ borderRadius: 5 }}
            >
              <Text className="text-white">Delete</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            className="w-full items-center p-4 bg-gray-500 my-4"
            onPress={() =>
              navigation.navigate("TransactionDetails", {
                id: data.product.productId,
              })
            }
          >
            <Text className="text-white">See transaction</Text>
          </Pressable>
        )
      ) : (
        <>
          {data.product.posterUserId !== user.userId &&
            (data.product.productStatus === "unsold" ? (
              <Pressable
                className="py-4 border border-[#CC481F] mt-5"
                style={{ borderRadius: 5 }}
                onPress={() =>
                  navigation.navigate("Menu", {
                    screen: "Message",
                    params: {
                      screen: "ProductMessage",
                      params: { details: data },
                    },
                  })
                }
              >
                <Text className="text-center text-[#CC481F] font-semibold">
                  Contact Seller
                </Text>
              </Pressable>
            ) : (
              <View className="mb-6 items-center">
                <Text className="text-[#CC481F] font-semibold">
                  Already sold
                </Text>
                <Pressable
                  className="py-4 w-full mt-2 bg-[#CC481F]"
                  onPress={() =>
                    navigation.navigate("TransactionDetails", {
                      id: data.product.productId,
                    })
                  }
                >
                  <Text className="text-center text-white">
                    Go to transaction
                  </Text>
                </Pressable>
              </View>
            ))}
          {data.product.productStatus !== "sold" && (
            <Pressable
              className="w-full items-center p-4  my-2 flex-row justify-center"
              onPress={onPressReport}
            >
              <Feather name="flag" size={22} color="#CC481F" />
              <Text className="text-[#CC481F] font-semibold ml-2">
                Report this item
              </Text>
            </Pressable>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
