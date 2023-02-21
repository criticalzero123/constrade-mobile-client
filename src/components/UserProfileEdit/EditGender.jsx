import { Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

export default function EditGender({ value, setValue }) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ width: width * 0.3 }}>
      <Text className="text-[#011B33] text-base mb-1">Gender</Text>
      <View className="border border-[#DFE5EB]">
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) =>
            itemIndex !== 0 && setValue(itemValue)
          }
        >
          <Picker.Item label="Select" enabled={false} />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
    </View>
  );
}
