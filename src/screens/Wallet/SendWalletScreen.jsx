import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { Picker } from "@react-native-picker/picker";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { useState } from "react";
import useGetAllWalletUser from "../../hooks/Wallet/useGetAllWalletUser";
import useSendMoney from "../../hooks/Wallet/useSendMoney";
import { useEffect } from "react";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function SendWalletScreen({ route }) {
  const { currentWalletId, balance } = route.params;
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [data, fetching] = useGetAllWalletUser();
  const { user } = useGetCurrentUser();
  const [userWalletId, setUserWalletId] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [amount, setAmount] = useState(0);

  const [sendMoneyTrigger] = useSendMoney();

  const onLeaveInput = () => {
    if (selectedUserEmail.trim() === "") return;

    setLoading(true);
    const _walletUser = data.find(
      (_w) =>
        _w.user.email.toLowerCase().trim() ===
        selectedUserEmail.toLowerCase().trim()
    );

    if (_walletUser === undefined) {
      alert("User Not Found!");
      setUserWalletId();
      setSelectedUser();
      setLoading(false);
      return;
    } else if (_walletUser.user.userId === user.userId) {
      alert("Cannot send to own wallet");
      setUserWalletId();
      setSelectedUser();
      setLoading(false);
      return;
    }

    setUserWalletId(_walletUser.walletId);
    setSelectedUser(_walletUser);

    setLoading(false);
  };

  const onClear = () => {
    setUserWalletId();
    setSelectedUser();
    setSelectedUserEmail("");
    setLoading(false);
  };

  const onSendMoney = async () => {
    setSending(true);
    let result = await sendMoneyTrigger(currentWalletId, userWalletId, amount);

    if (result === "NotEnough") {
      alert("Money is not enough");
      setSending(false);
      return;
    }

    if (result === "Error") {
      alert("Something went wrong");
      setSending(false);
      return;
    }

    if (result === "UserNotFound") {
      alert("User is not found.");
      setSending(false);
      return;
    }

    if (result === "Success") {
      navigation.dispatch(
        StackActions.replace("SendReceipt", {
          data: { amount, ...selectedUser },
        })
      );
      setSending(false);
      return;
    }
  };

  if (fetching) return <ActivityIndicator />;

  return (
    <ContainerSafeView styleName={"h-screen"}>
      <HeaderArrow headerName={"Send Money"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data && userWalletId === undefined && (
          <View>
            <Text className="text-gray-500">Input User Email</Text>
            <TextInput
              value={selectedUserEmail}
              onChangeText={setSelectedUserEmail}
              placeholder="Email..."
              className="border-b border-gray-400 rounded p-2"
              keyboardType="email-address"
              onBlur={onLeaveInput}
            />
          </View>
        )}
        {!loading ? (
          userWalletId && (
            <View className="justify-between" style={{ height: height * 0.9 }}>
              <View>
                <View
                  className="flex-row justify-between items-center px-3 py-4 bg-gray-600 shadow-2xl"
                  style={{ borderRadius: 15 }}
                >
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: selectedUser.user.imageUrl }}
                      style={{
                        height: height * 0.05,
                        width: width * 0.1,
                        borderRadius: 10000,
                      }}
                    />
                    <View className="ml-2">
                      <Text className="text-white capitalize font-semibold text-lg">
                        {selectedUser.person.firstName}{" "}
                        {selectedUser.person.lastName}
                      </Text>
                      <Text className="text-gray-300">
                        {selectedUser.user.email}
                      </Text>
                    </View>
                  </View>
                  <Pressable onPress={onClear}>
                    <Text className="text-[#FF6838] font-semibold">Change</Text>
                  </Pressable>
                </View>

                <View className="mt-10 items-center">
                  <View className="flex-row items-center">
                    <Text className="text-[#FF6838] text-2xl">₱</Text>
                    <TextInput
                      value={amount}
                      onChangeText={setAmount}
                      keyboardType="number-pad"
                      placeholder="0.0"
                      className="text-center border-b border-gray-400 ml-1"
                      style={{ alignSelf: "flex-start" }}
                    />
                  </View>
                  <Text className="mt-3 text-gray-400">
                    Your available money is{" "}
                    <Text className="text-[#FF6838]">₱{balance}</Text>
                  </Text>
                </View>
              </View>
              <Pressable
                className="justify-self-end p-3 bg-[#CC481F] "
                style={{ borderRadius: 10 }}
                onPress={!sending && onSendMoney}
                disabled={sending}
              >
                <Text className="text-center text-white font-semibold text-base">
                  {sending ? <ActivityIndicator /> : "Send"}
                </Text>
              </Pressable>
            </View>
          )
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
