import { Text, useWindowDimensions, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { itemWallet } from "../../../service/walletService";
import WalletItemAction from "../../components/Wallet/WalletItemAction";
import useGetWalletUser from "../../hooks/Wallet/useGetWalletUser";
import useGetAllTransactionsWallet from "../../hooks/Wallet/useGetAllTransactionsWallet";
import MessageEmpty from "../../components/messages/MessageEmpty";

export default function WalletScreen() {
  const { user } = useGetCurrentUser();
  const { data } = useGetWalletUser(user.userId);
  const { transacs } = useGetAllTransactionsWallet(user.userId);
  const { width, height } = useWindowDimensions();

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Wallet"} />
      <View
        className="bg-[#CF3100] justify-center items-center rounded-lg"
        style={{ height: height * 0.2 }}
      >
        <Text className="text-white font-semibold text-4xl">
          ₱ {data && data.balance}
        </Text>
        <Text className="text-white font-semibold text-base opacity-80">
          Available balance
        </Text>
      </View>
      <View className="flex-row justify-between mt-2">
        {itemWallet.map((item) => (
          <WalletItemAction key={item.id} data={item} />
        ))}
      </View>

      <View className="mt-5">
        <Text className="mb-3 text-xl font-semibold">Recent transactions</Text>

        {transacs && transacs.length === 0 ? (
          <MessageEmpty
            title="You got no transaction"
            description="Go transac to get a wallet transaction"
            ads={false}
          />
        ) : (
          <>
            <View className="justify-between flex-row items-center">
              <View>
                <Text className="text-base mb-1">Send Payment</Text>
                <Text className="text-md opacity-50">Today at 8:00AM</Text>
              </View>
              <Text className="text-red-500 font-semibold">- ₱ 240.00</Text>
            </View>
            <View className="my-2" />
            <View className="justify-between flex-row items-center">
              <View>
                <Text className="text-base mb-1">Received Payment</Text>
                <Text className="text-md opacity-50">Today at 8:00AM</Text>
              </View>
              <Text className="text-green-500 font-semibold">+ ₱ 1000.00</Text>
            </View>
          </>
        )}
      </View>
    </ContainerSafeView>
  );
}
