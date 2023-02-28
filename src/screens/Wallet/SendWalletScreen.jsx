import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { Picker } from "@react-native-picker/picker";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { useState } from "react";
import useGetAllWalletUser from "../../hooks/Wallet/useGetAllWalletUser";
import useSendMoney from "../../hooks/Wallet/useSendMoney";

export default function SendWalletScreen({ route }) {
  const { currentWalletId } = route.params;

  const [data, loading] = useGetAllWalletUser();
  const { user } = useGetCurrentUser();
  const [userSelected, setUserSelected] = useState();
  const [amount, setAmount] = useState(0);

  const [sendMoneyTrigger, result] = useSendMoney();

  return (
    <ContainerSafeView>
      {result && alert("Sending money successful!")}
      {data && data.length > 0 && (
        <View className="border border-gray-400 rounded-lg">
          <Picker
            selectedValue={userSelected}
            onValueChange={(item) => setUserSelected(item)}
          >
            <Picker.Item label={`select`} />
            {data.map(
              (_user) =>
                _user.userId !== user.userId && (
                  <Picker.Item
                    label={`${_user.user.email}`}
                    value={`${_user.walletId}`}
                  />
                )
            )}
          </Picker>
        </View>
      )}

      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="number-pad"
      />

      <Pressable
        onPress={() => sendMoneyTrigger(currentWalletId, userSelected, amount)}
      >
        <Text className="text-center">Send</Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
