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
import { getUserInfo } from "../../../redux/actions/userActions";
import { saveImageProfile } from "../../../firebase/firebaseStorageBucket";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function UserProfileEdit({ route }) {
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const { data } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(
    data.person.birthdate !== null ? data.person.birthdate : null
  );
  const [gender, setGender] = useState(data.person.gender);
  const [disable, setDisable] = useState(false);
  const [imagePhoto, setImagePhoto] = useState(
    data.user.imageUrl === "" ? image : data.user.imageUrl
  );

  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();

  const updated = useSelector((state) => state.updatePersonInfoReducer);
  const { success, loading } = updated;

  const navigation = useNavigation();

  useEffect(() => {
    if (loading) return;

    if (success && updated.data) {
      dispatch(getUserInfo(updated.data));
      dispatch({ type: "UPDATE_USER_INFO_LEAVE" });
      setDisable(false);
      navigation.dispatch(StackActions.replace("UserProfile"));
    }
  }, [success, loading, updated.data]);

  const onPressAction = async () => {
    setDisable(true);
    let imageUrlPhoto = data.user.imageUrl;
    if (imagePhoto !== data.user.imageUrl)
      imageUrlPhoto = await saveImageProfile(imagePhoto, data.user.userId);

    const user = {
      ...data.user,
      imageUrl: imageUrlPhoto,
    };
    const person = {
      ...data.person,
      firstName: firstName === "" ? data.person.firstName : firstName,
      lastName: lastName === "" ? data.person.lastName : lastName,
      birthdate: birthdate !== null ? Date(birthdate) : null,
      gender: gender,
    };

    dispatch(updatePersonInfo({ user, person }));
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
            textPlaceholder={data.person.firstName}
          />

          <EditTextInput
            label="Last name"
            value={lastName}
            setValue={setLastName}
            textPlaceholder={data.person.lastName}
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
