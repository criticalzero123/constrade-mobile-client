import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import useGetProductUser from "../../hooks/Product/useGetProductUser";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import MessageEmpty from "../../components/messages/MessageEmpty";
import ItemCard from "../../components/Products/ItemCard";
import { ActivityIndicator } from "react-native-paper";

export default function ListingScreen({ route }) {
  const { user, person } = route.params;
  const { user: currentUser } = useGetCurrentUser();
  const [data, loading] = useGetProductUser(user.userId);

  return (
    <ContainerSafeView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <HeaderArrow
              headerName={
                currentUser.userId === user.userId
                  ? "My Listings"
                  : person.firstName + " Listings"
              }
            />
            {data && data.length === 0 ? (
              <MessageEmpty
                title="No item here."
                description="Post some item to be a great guy."
              />
            ) : (
              data && (
                <View className="flex-row flex-wrap justify-evenly">
                  {data.map((_data, index) => (
                    <ItemCard data={_data} key={index} showLike={false} />
                  ))}
                </View>
              )
            )}
          </View>
        )}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
