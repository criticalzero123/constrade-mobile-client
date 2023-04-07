import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { Picker } from "@react-native-picker/picker";
import { ValidIdType } from "../../../service/enums";
import {
  getHasRequest,
  submitIdRequest,
} from "../../../redux/actions/userActions";
import { useEffect } from "react";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { useNavigation } from "@react-navigation/native";
export default function VerificationScreen({ route }) {
  const { data } = route.params;
  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState(0);
  const navigation = useNavigation();
  const [requestInfo, setRequestInfo] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getHasRequest(data.user.userId);

      setRequestInfo(res);
    };

    fetch();
  }, []);

  const onPress = async () => {
    if (idNumber.trim() === "") {
      alert("Put some id number..");
      return;
    }

    const info = {
      userName:
        data.person.firstName.toLowerCase() +
        " " +
        data.person.lastName.toLowerCase(),
      userId: data.user.userId,
      validationType: idType,
      validIdNumber: idNumber.toLowerCase(),
    };

    const res = await submitIdRequest(info);

    if (res) {
      alert("Successfully submitted!");
      navigation.dispatch();
    } else {
      alert("Not successful submitted!");
    }
  };

  if (requestInfo && requestInfo.status.toLowerCase() === "accepted")
    return (
      <ContainerSafeView>
        <HeaderArrow headerName="Verification" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-bold">Already Verified</Text>
        </View>
      </ContainerSafeView>
    );

  if (requestInfo && requestInfo.status.toLowerCase() === "pending")
    return (
      <ContainerSafeView>
        <HeaderArrow headerName="Verification" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-bold">Pending Verification</Text>
          <Text className="text-base">
            Submitted at{" "}
            {new Date(requestInfo.requestDate).toLocaleDateString()}
          </Text>
        </View>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName="Verification" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Id Number</Text>
        <TextInput
          value={idNumber}
          onChangeText={setIdNumber}
          placeholder="Id Number Here..."
          autoCapitalize="none"
        />
        <View className="mt-10" />
        <Text>Id Type</Text>
        <Picker
          selectedValue={idType}
          onValueChange={(item) => setIdType(item)}
        >
          {ValidIdType.map((id, index) => (
            <Picker.Item value={index} label={id} key={index} />
          ))}
        </Picker>
        <Pressable className="mt-5 p-2 border" onPress={onPress}>
          <Text className="text-center">Submit</Text>
        </Pressable>
        {requestInfo && requestInfo.status.toLowerCase() === "rejected" && (
          <Text className="text-center text-red-500 my-10 text-lg font-semibold">
            You have been rejected, please submit again.
          </Text>
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
