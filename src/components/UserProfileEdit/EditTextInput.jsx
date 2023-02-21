import { Text, View, TextInput } from "react-native";
import React from "react";

export default function EditTextInput({
  textPlaceholder,
  value,
  setValue,
  label,
}) {
  return (
    <View className="mb-6">
      <Text className="text-[#011B33] text-base mb-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={textPlaceholder}
        autoCapitalize="words"
        className="border border-[#DFE5EB] py-2 px-4 rounded"
      />
    </View>
  );
}
