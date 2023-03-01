import { StyleSheet, Text, View } from "react-native";
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
  const [data, loading, error] = useGetProductUser(user.userId);

  console.log(route.params);
  return (
    <ContainerSafeView>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <HeaderArrow headerName={"My Listings"} />
          <Text>MyListing</Text>
          {data && data.length === 0 ? (
            <MessageEmpty
              title="No item here."
              description="Post some item to be a great guy."
            />
          ) : (
            data &&
            data.map((product, index) => (
              // TODO: Change the item card because it has the user info in their own
              <View>
                <ItemCard
                  data={product}
                  key={index}
                  showLike={false}
                  person={person}
                  user={user}
                />
              </View>
            ))
          )}
        </View>
      )}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
