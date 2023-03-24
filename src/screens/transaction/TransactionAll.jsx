import { StyleSheet, Text, View } from "react-native";
import React from "react";

import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useTransaction from "../../hooks/transaction/useTransaction";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import TransactionItem from "../../components/transactions/TransactionItem";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
export default function TransactionAll({ route }) {
  const { user } = route.params;
  const { user: currentUser } = useGetCurrentUser();
  const [transactions, setTransactions] = useTransaction(user.userId);

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Transactions"} />
      {transactions &&
        (transactions.length === 0 ? (
          <View>
            <Text>No transaction found.</Text>
          </View>
        ) : (
          transactions.map((data) => (
            <TransactionItem
              data={data}
              key={data.transactionId}
              currentUserId={currentUser.userId}
            />
          ))
        ))}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
