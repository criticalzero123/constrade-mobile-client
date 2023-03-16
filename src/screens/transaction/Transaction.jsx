import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useTransaction from "../../hooks/Transaction/useTransaction";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";

export default function Transaction({ route }) {
  const { id } = route.params;
  const [transaction] = useTransaction(id);
  if (transaction)
    return (
      <ContainerSafeView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>Product Id: {transaction.transaction.productId}</Text>
          <Text>
            Buyer: {transaction.buyer.firstName} {transaction.buyer.lastName}
          </Text>
          <Text>
            Seller: {transaction.seller.firstName} {transaction.seller.lastName}
          </Text>
          <Text>
            Time Transcated:{" "}
            {new Date(
              transaction.transaction.dateTransaction
            ).toLocaleDateString()}{" "}
            {new Date(
              transaction.transaction.dateTransaction
            ).toLocaleTimeString()}
          </Text>
        </ScrollView>
      </ContainerSafeView>
    );
}

const styles = StyleSheet.create({});
