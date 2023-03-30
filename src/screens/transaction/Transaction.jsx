import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useEffect } from "react";
import { getProductTransaction } from "../../../redux/actions/transactionAction";
import { useState } from "react";

export default function Transaction({ route }) {
  const { id } = route.params;
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    if (id === undefined) return;

    const fetch = async () => {
      const result = await getProductTransaction(id);

      if (result) {
        setTransaction(result);
      } else {
        alert("Something went wrong in fetching transaction");
      }
    };

    fetch();
  }, [id]);

  return (
    <ContainerSafeView>
      {transaction === undefined ? (
        <Text>Fetching...</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>Product Id: {transaction.transaction.productId}</Text>
          <Text>Product Name: {transaction.product.title}</Text>
          <Text>
            Buyer: {transaction.buyer.person.firstName}{" "}
            {transaction.buyer.person.lastName}
          </Text>
          <Text>
            Seller: {transaction.seller.person.firstName}{" "}
            {transaction.seller.person.lastName}
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
      )}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
