import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useEffect } from "react";
import { getProductTransaction } from "../../../redux/actions/transactionAction";
import { useState } from "react";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
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

  if (transaction === undefined) return <Text>Fetching...</Text>;

  const TextContainer = ({ leftText, rightText }) => {
    return (
      <View className="flex-row items-center justify-between my-1">
        <Text>{leftText}</Text>
        <Text className="capitalize">{rightText}</Text>
      </View>
    );
  };

  const transactedWith = () => {
    if (transaction.product.item === "") return transaction.product.cash;
    if (transaction.product.cash === 0) return transaction.product.item;

    return transaction.product.item + " & " + transaction.product.cash;
  };

  return (
    <ContainerSafeView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderArrow headerName={"Transaction Information"} />
        <View className="items-center">
          <Text className="text-2xl font-semibold">Transaction Success</Text>
          <View className="w-full bg-gray-300 p-4" style={{ borderRadius: 10 }}>
            <TextContainer
              leftText={"Reference No.:"}
              rightText={transaction.transaction.transactionId}
            />
            <TextContainer
              leftText={"Product Name:"}
              rightText={transaction.product.title}
            />
            <TextContainer
              leftText={"Transaction Type:"}
              rightText={transaction.product.preferTrade}
            />
            <TextContainer
              leftText={"Traded with:"}
              rightText={transactedWith()}
            />
            <TextContainer
              leftText={"Buyer"}
              rightText={
                transaction.buyer.person.firstName +
                " " +
                transaction.buyer.person.lastName
              }
            />

            <TextContainer
              leftText={"Seller"}
              rightText={
                transaction.seller.person.firstName +
                " " +
                transaction.seller.person.lastName
              }
            />
            <TextContainer
              leftText={"Date transacted"}
              rightText={new Date(
                transaction.transaction.dateTransaction
              ).toLocaleDateString()}
            />
            <TextContainer
              leftText={"Time transacted"}
              rightText={new Date(
                transaction.transaction.dateTransaction
              ).toLocaleTimeString()}
            />
          </View>
        </View>
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
