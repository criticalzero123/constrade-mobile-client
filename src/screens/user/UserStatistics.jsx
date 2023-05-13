import { StyleSheet, Text, View } from "react-native";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import React from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { useState } from "react";
import { useEffect } from "react";
import { getUserStatistic } from "../../../redux/actions/userActions";

export default function UserStatistics() {
  const { user } = useGetCurrentUser();
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserStatistic(user.userId);

      setData(res);
    };

    fetch();
  }, []);

  if (data === undefined)
    return (
      <ContainerSafeView>
        <Text>Loading...</Text>
      </ContainerSafeView>
    );

  if (data.length === 0)
    return (
      <ContainerSafeView>
        <Text>No transaction of e-Wallet or Cash related.</Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      {data.map((p, index) => {
        return (
          <View key={index}>
            <Text>
              {p.title} sold for: <Text>₱{p.cash}</Text>
            </Text>
          </View>
        );
      })}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
