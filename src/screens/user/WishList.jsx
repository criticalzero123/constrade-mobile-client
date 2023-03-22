import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import useFavorite from "../../hooks/Favorite/useFavorite";
import ItemCard from "../../components/Products/ItemCard";
import MessageEmpty from "../../components/messages/MessageEmpty";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function WishList() {
  const { user } = useGetCurrentUser();
  const { favorites, setFavorites, deleteFromFavorite } = useFavorite(
    user.userId
  );

  const onRemove = async (id) => {
    const result = await deleteFromFavorite(id);

    if (result) {
      const filtered = favorites.filter((_f) => _f.favoriteId !== id);

      setFavorites(filtered);
    } else {
      alert("Unable to delete from favorite  from now.");
    }
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Wishlist"} />

      {favorites &&
        (favorites.length === 0 ? (
          <MessageEmpty
            title="Wishlist is empty"
            description="Add to your favorite product to see here."
            ads={true}
          />
        ) : (
          <View
            className={`flex-row flex-wrap ${
              favorites.length > 1 && "justify-evenly"
            }`}
          >
            {favorites.map((item, index) => (
              <View key={index}>
                <ItemCard data={item.product} showLike={false} />
                <Pressable onPress={() => onRemove(item.favoriteId)}>
                  <Text
                    className="text-red-700 font-semibold bg-gray-200 text-center p-2 mr-2 -mt-3"
                    style={{ borderRadius: 5 }}
                  >
                    Remove
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
