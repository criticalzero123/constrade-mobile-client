import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { showFollowUser } from "../../../redux/actions/followActions";
import { useNavigation } from "@react-navigation/native";

export default function ShowFollowingUsers({ route }) {
  const { userId } = route.params;
  const [following, setFollowing] = useState();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  useEffect(() => {
    const fetch = async () => {
      const res = await showFollowUser(userId);

      if (res) {
        setFollowing(res);
      }
    };
    fetch();
  }, [userId]);

  if (following === undefined)
    return (
      <ContainerSafeView>
        <Text>Loading...</Text>
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Followed"} />
      {following.map((f, index) => (
        <Pressable
          key={index}
          className="my-2 p-2 bg-gray-200 flex-row gap-x-2 items-center rounded"
          onPress={() =>
            navigation.navigate("OtherUserProfile", { userId: f.user.userId })
          }
        >
          <Image
            source={{ uri: f.user.imageUrl }}
            style={{
              width: width * 0.1,
              height: height * 0.05,
              borderRadius: 1000,
            }}
          />
          <View>
            <Text className="capitalize">
              {f.person.firstName} {f.person.lastName}
            </Text>
            <Text className="mt-1 text-gray-400">{f.user.email}</Text>
          </View>
        </Pressable>
      ))}
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
