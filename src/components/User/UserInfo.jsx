import {
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import backImage from "../../../assets/Discover/orange-scenery.jpg";
import { useNavigation } from "@react-navigation/native";
import useUserFollowAndFollowers from "../../hooks/useUserFollowAndFollowers";
import useUserReview from "../../hooks/useUserReview";
import BottomModal from "../../components/modal/BottomModal";
import { useState } from "react";
import { pickBackgroundPhotoImage } from "../../../service/editProfileService";
import { saveBackgroundImageProfile } from "../../../firebase/firebaseStorageBucket";
import { useDispatch } from "react-redux";
import {
  getUserInfo,
  updatePersonInfo,
} from "../../../redux/actions/userActions";

export default function UserInfo({ headerName, myProfile = true, data }) {
  const navigation = useNavigation();
  const [follow] = useUserFollowAndFollowers(data && data.user.userId);
  const [review] = useUserReview(data && data.user.userId);
  const { height, width } = useWindowDimensions();

  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    data && data.user.backgroundImageUrl
  );
  const [saveVisible, setSaveVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (data === undefined) return;

  const onSaveBackgroundImage = async () => {
    setLoading(true);
    const imageUrlPhoto = await saveBackgroundImageProfile(
      backgroundImage,
      data.user.userId
    );
    const user = {
      ...data.user,
      backgroundImageUrl: imageUrlPhoto,
    };
    const person = {
      ...data.person,
    };

    const res = await updatePersonInfo({ user, person });

    if (res) {
      dispatch(getUserInfo(res));
      alert("Update successfully.");
    } else {
      alert("Something went wrong in updating.");
    }

    setSaveVisible(!saveVisible);
    setLoading(false);
  };

  return (
    <View>
      <Image
        source={
          backgroundImage.trim() === "" ? backImage : { uri: backgroundImage }
        }
        className="absolute w-full h-4/6"
        style={{ resizeMode: "stretch" }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.35)", "rgba(36, 33, 32, 1)"]}
        className="w-full h-4/6 absolute"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      ></LinearGradient>

      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row justify-between mt-3 mb-4">
          <View className="flex-row">
            <Pressable
              onPress={() => navigation.reset({ routes: [{ name: "Menu" }] })}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text className="ml-2 text-lg font-semibold text-white capitalize">
              {headerName}
            </Text>
          </View>
          {myProfile && data.user.userType === "premium" && !saveVisible && (
            <Pressable onPress={() => setBackgroundVisible(!backgroundVisible)}>
              <AntDesign name="edit" size={21} color="white" />
            </Pressable>
          )}
          {saveVisible && !loading && (
            <View className="flex-row items-center">
              <Pressable
                onPress={() => {
                  setSaveVisible(!saveVisible);
                  setBackgroundImage(data.user.backgroundImageUrl);
                }}
              >
                <AntDesign name="closecircle" size={24} color="red" />
              </Pressable>

              <Pressable onPress={onSaveBackgroundImage} className="ml-4">
                <AntDesign name="checkcircleo" size={24} color="white" />
              </Pressable>
            </View>
          )}
          {loading && <ActivityIndicator />}
        </View>
        <View className="items-center">
          <View className=" items-center">
            <View
              className="border-2 border-[#FF6838] rounded-full items-center "
              style={{ overflow: "hidden", borderRadius: 1000 }}
            >
              <Image
                source={{
                  uri: data.user.imageUrl,
                }}
                style={{
                  height: height * 0.15,
                  width: width * 0.3,
                  resizeMode: "cover",
                }}
              />
            </View>
            <Text className="text-white font-semibold px-4 py-1 rounded-2xl bg-[#FF6838] absolute bottom-0 uppercase">
              {data.user.userType}
            </Text>
          </View>

          <Text className="text-white font-semibold text-lg mt-4 capitalize">
            {data.person.firstName} {data.person.lastName}
          </Text>
          <Text className="text-gray-300 mt-1 mb-8">{data.user.email}</Text>

          <View className="w-full flex-row justify-between p-5 rounded-md bg-[#508CC7]">
            <View className="items-center">
              <Text className="font-bold text-xl text-white">
                {follow === undefined ? (
                  <ActivityIndicator size="small" />
                ) : (
                  follow && follow.followedCount
                )}
              </Text>
              <Text className="mt-3 opacity-75 text-white">Following</Text>
            </View>
            <View className="border-l border-[#F7FAFC26]"></View>
            <View className="items-center">
              <View className="flex-row items-center">
                <FontAwesome name="star" size={20} color="white" />
                <Text className="font-bold text-xl text-white ml-2">
                  {review !== undefined ? (
                    review
                  ) : (
                    <ActivityIndicator size="small" />
                  )}
                </Text>
              </View>
              <Text className="mt-3 opacity-75 text-white">Ratings</Text>
            </View>
            <View className="border-l border-[#F7FAFC26]"></View>
            <View className="items-center">
              <Text className="font-bold text-xl text-white">
                {follow === undefined ? (
                  <ActivityIndicator size="small" />
                ) : (
                  follow && follow.followCount
                )}
              </Text>
              <Text className="mt-3 opacity-75 text-white">Followers</Text>
            </View>
          </View>
        </View>
      </View>
      <BottomModal
        isVisible={backgroundVisible}
        setIsVisible={setBackgroundVisible}
      >
        <Pressable
          className="items-center py-4 border border-[#CC481F] w-full"
          style={{ borderRadius: 10 }}
          onPress={() =>
            pickBackgroundPhotoImage(
              setBackgroundImage,
              data.user.userType === "premium",
              setSaveVisible,
              setBackgroundVisible
            )
          }
        >
          <Text className="text-[#CC481F] font-semibold">
            Choose Background Image
          </Text>
        </Pressable>
      </BottomModal>
    </View>
  );
}
