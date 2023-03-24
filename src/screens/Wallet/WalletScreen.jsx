import { Text, useWindowDimensions, View, ScrollView } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { itemWallet } from "../../../service/walletService";
import WalletItemAction from "../../components/Wallet/WalletItemAction";
import useGetWalletUser from "../../hooks/wallet/useGetWalletUser";
import useGetAllTransactionsWallet from "../../hooks/wallet/useGetAllTransactionsWallet";
import MessageEmpty from "../../components/messages/MessageEmpty";
import { useNavigation } from "@react-navigation/native";
import RecentTransactionItem from "../../components/Wallet/RecentTransactionItem";

export default function WalletScreen() {
  const { user } = useGetCurrentUser();
  const { data } = useGetWalletUser(user.userId);
  const { transacs } = useGetAllTransactionsWallet(data && data.walletId);
  const { width, height } = useWindowDimensions();

  const navigation = useNavigation();

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Wallet"} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          {data &&
            itemWallet.map((item) => (
              <WalletItemAction
                key={item.id}
                data={item}
                onPress={() =>
                  navigation.navigate(item.to, {
                    currentWalletId: data.walletId,
                    balance: data.balance,
                  })
                }
              />
            ))}
        </View>
        <View className="mt-5">
          <Text className="mb-3 text-xl font-semibold">
            Recent transactions
          </Text>

          {transacs && transacs.length === 0 ? (
            <MessageEmpty
              title="You got no transaction"
              description="Go transac to get a wallet transaction"
              ads={false}
            />
          ) : (
            <>
              {transacs &&
                transacs.map((_data) => (
                  <RecentTransactionItem
                    data={_data}
                    currentUserWalletId={data.walletId}
                  />
                ))}
            </>
          )}
        </View>
      </ScrollView>
    </ContainerSafeView>
  );
}
