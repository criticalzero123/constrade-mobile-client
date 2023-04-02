import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import RecentTransactionItem from "../../components/Wallet/RecentTransactionItem";

export default function WalletHistory({ route }) {
  const { transactionsAll, currentWalletId } = route.params;

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Wallet Transactions"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {transactionsAll && transactionsAll.length === 0 ? (
          <MessageEmpty
            title="You got no transaction"
            description="Go transac to get a wallet transaction"
            ads={false}
          />
        ) : (
          <>
            {transactionsAll &&
              transactionsAll.map((_data, index) => (
                <RecentTransactionItem
                  data={_data}
                  key={index}
                  currentUserWalletId={currentWalletId}
                />
              ))}
          </>
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
