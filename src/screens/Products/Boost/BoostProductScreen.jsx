import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../../components/CustomViews/ContainerSafeView";
import useBoostProduct from "../../../hooks/boost/useBoostProduct";
import { TextInput } from "react-native-paper";
import { useState } from "react";

export default function BoostProductScreen({ route }) {
  const { id } = route.params;
  const [data, submit, cancel] = useBoostProduct(id);
  const [days, setDays] = useState(0);

  return (
    <ContainerSafeView>
      {data !== undefined &&
        (data === null ? (
          <>
            <TextInput
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
            />
            <Pressable className="p-4 border" onPress={() => submit(id, days)}>
              <Text className="text-center">Submit</Text>
            </Pressable>
          </>
        ) : (
          data.status === "active" && (
            <View>
              <Text>ID: {data.boostProductId}</Text>
              <Text>Product Id: {data.productId}</Text>
              <Text>Days Boosted: {data.daysBoosted}</Text>
              <Text>Status: {data.status}</Text>
              <Text>DateTime Expired: {data.dateTimeExpired}</Text>
              <Text>Date Boosted: {data.dateBoosted}</Text>

              <Pressable
                className="p-4 border"
                onPress={() => cancel(data.boostProductId)}
              >
                <Text className="text-center">Cancel</Text>
              </Pressable>
            </View>
          )
        ))}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
