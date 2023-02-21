import { Platform, Pressable, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function EditDatePicker({ value, setValue }) {
  const [visible, setVisible] = useState(false);
  const [dateValue, setDateValue] = useState(value);

  const dateToString = (date) => {
    return new Date(date).toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const onChange = (e, date) => {
    const newDate = new Date(date.toLocaleDateString());
    if (e.type === "set") {
      setDateValue(date);
      setValue(newDate);
    }
    setVisible(false);
  };

  return (
    <View className="mb-6">
      <Text className="text-[#011B33] text-base mb-1">Birthdate</Text>
      <Pressable
        className="border border-[#DFE5EB] py-2 px-4 rounded"
        onPress={() => setVisible(true)}
      >
        <TextInput
          value={
            dateValue !== null
              ? dateToString(dateValue)
              : dateToString(new Date())
          }
          editable={false}
        />
      </Pressable>
      {visible && (
        <RNDateTimePicker
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={dateValue !== null ? new Date(dateValue) : new Date()}
          maximumDate={new Date()}
          onChange={onChange}
          positiveButton={{ label: "OK", textColor: "green" }}
          neutralButton={{ label: "Clear", textColor: "grey" }}
          negativeButton={{ label: "Cancel", textColor: "red" }}
        />
      )}
    </View>
  );
}
