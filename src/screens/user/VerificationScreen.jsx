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
import { submitIdRequest } from "../../../redux/actions/userActions";

export default function VerificationScreen({ route }) {
  const { data } = route.params;
  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState(0);

  const onPress = () => {
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

    submitIdRequest(info);
  };

  return (
    <ContainerSafeView>
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
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
