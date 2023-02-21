import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import KeyboardHideView from "../../components/CustomViews/KeyboardHideView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";

import { AntDesign } from "@expo/vector-icons";
import { pickPhotoImage } from "../../../service/editProfileService";
import EditTextInput from "../../components/UserProfileEdit/EditTextInput";
import EditDatePicker from "../../components/UserProfileEdit/EditDatePicker";
import EditGender from "../../components/UserProfileEdit/EditGender";
import CustomButton from "../../components/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonInfo } from "../../../redux/actions/userActions";
import { useEffect } from "react";
import { getUserInfo } from "../../../redux/actions/authActions";
import { saveImageProfile } from "../../../firebase/firebaseStorageBucket";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function UserProfileEdit({ route }) {
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const { user } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [gender, setGender] = useState(user.gender);
  const [disable, setDisable] = useState(false);
  const [imagePhoto, setImagePhoto] = useState(
    user.imageUrl === "" ? image : user.imageUrl
  );

  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();

  const { success, data, loading } = useSelector(
    (state) => state.updatePersonInfoReducer
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (loading) return;

    if (success && data) {
      dispatch(getUserInfo(data));
      dispatch({ type: "UPDATE_USER_INFO_LEAVE" });
      setDisable(false);
      navigation.dispatch(StackActions.replace("UserProfile"));
    }
  }, [success, loading, data]);

  const onPressAction = async () => {
    setDisable(true);
    let imageUrlPhoto = user.imageUrl;
    if (imagePhoto !== user.imageUrl)
      imageUrlPhoto = await saveImageProfile(imagePhoto, user.userId);

    const userInfo = {
      ...user,
      firstName: firstName === "" ? user.firstName : firstName,
      lastName: lastName === "" ? user.lastName : lastName,
      birthdate: new Date(birthdate),
      gender: gender,
      imageUrl: imageUrlPhoto,
    };
    dispatch(updatePersonInfo(userInfo));
  };

  return (
    <KeyboardHideView enabled={true}>
      <HeaderArrow headerName="Profile settings" />
      <View className="justify-between" style={{ height: height * 0.94 }}>
        <View>
          <View className="items-center mt-2 mb-4">
            <Image
              source={{ uri: imagePhoto }}
              className="rounded-full"
              style={{
                resizeMode: "contain",
                width: width * 0.3,
                height: height * 0.15,
              }}
            />
            <Pressable
              className="flex-row items-center mt-4"
              onPress={() => pickPhotoImage(setImagePhoto)}
            >
              <AntDesign name="edit" size={24} color="#CC481F" />
              <Text className="text-[#CC481F] font-semibold ml-2">
                Change photo
              </Text>
            </Pressable>
          </View>

          <EditTextInput
            label="First name"
            value={firstName}
            setValue={setFirstName}
            textPlaceholder={user.firstName}
          />

          <EditTextInput
            label="Last name"
            value={lastName}
            setValue={setLastName}
            textPlaceholder={user.lastName}
          />

          <EditDatePicker value={birthdate} setValue={setBirthdate} />
          <EditGender value={gender} setValue={setGender} />
        </View>
        <CustomButton disabled={disable} onPress={onPressAction}>
          {loading && <ActivityIndicator size="small" />} Save Changes
        </CustomButton>
      </View>
    </KeyboardHideView>
  );
}

const styles = StyleSheet.create({});
