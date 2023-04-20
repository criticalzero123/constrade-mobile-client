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
  const { data } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(
    data.person.birthdate !== null ? data.person.birthdate : null
  );
  const [gender, setGender] = useState(data.person.gender);
  const [disable, setDisable] = useState(false);
  const [imagePhoto, setImagePhoto] = useState(data.user.imageUrl);

  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

    const res = await updatePersonInfo({ user, person });

    if (res) {
      dispatch(getUserInfo(res));

      navigation.dispatch(StackActions.replace("UserProfile"));
    } else {
      alert("Something went wrong in updating.");
      setDisable(false);
    }
  };

  return (
    <KeyboardHideView enabled={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderArrow headerName="Profile settings" />
        <View className="justify-between" style={{ height: height * 0.94 }}>
          <View>
            <View className="items-center mt-2 mb-4">
              <View
                style={{
                  width: width * 0.25,
                  height: height * 0.123,
                  resizeMode: "contain",
                  borderRadius: 1000,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: imagePhoto }}
                  className="rounded-full"
                  style={{
                    width: width * 0.25,
                    height: height * 0.123,
                  }}
                />
              </View>

              <Pressable
                className="flex-row items-center mt-4"
                onPress={() =>
                  pickPhotoImage(
                    setImagePhoto,
                    data.user.userType === "premium"
                  )
                }
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
            {disable ? <ActivityIndicator size="small" /> : "Save Changes"}
          </CustomButton>
        </View>
      </ScrollView>
    </KeyboardHideView>
  );
}

const styles = StyleSheet.create({});
