import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

export default function ProductImageDisplayList({ images, setImageDisplay }) {
  const { width, height } = useWindowDimensions();
  const ImageDisplay = ({ uri }) => {
    return (
      <Pressable className="mr-2 " onPress={() => setImageDisplay(uri)}>
        <Image
          source={{ uri: uri }}
          style={{
            width: width * 0.33,
            height: height * 0.1,
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
      </Pressable>
    );
  };
  return (
    <View className="p-2 bg-gray-200 mt-3" style={{ borderRadius: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }) => <ImageDisplay uri={item.imageURL} />}
        keyExtractor={(item) => item.imageId}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
