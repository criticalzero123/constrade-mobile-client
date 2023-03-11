import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import useFavorite from "../../hooks/Favorite/useFavorite";
import ItemCard from "../../components/Products/ItemCard";
import MessageEmpty from "../../components/messages/MessageEmpty";

export default function WishList({ route }) {
  const { user, person } = route.params;
  const { data, deleteFromFavorite } = useFavorite(user.userId);

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Wishlist"} />

      {data &&
        (data.length === 0 ? (
          <MessageEmpty
            title="Wishlist is empty"
            description="Add to your favorite product to see here."
            ads={true}
          />
        ) : (
          data.map((item, index) => (
            <View key={index}>
              <ItemCard
                data={item.product}
                showLike={false}
                person={person}
                user={user}
              />
              <Pressable onPress={() => deleteFromFavorite(item.favoriteId)}>
                <Text>delete</Text>
              </Pressable>
            </View>
          ))
        ))}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
