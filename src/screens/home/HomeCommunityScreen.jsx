import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getCommunity } from "../../../redux/actions/homeActions";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import CommunityCard from "../../components/Home/CommunityCard";
import { useHideBottomTab } from "../../hooks/useHideBottomTab";
import EndMessage from "../../components/EndMessage/EndMessage";

export default function HomeCommunityScreen({ route }) {
  useHideBottomTab();
  const { userId } = route.params;
  const [community, setCommunity] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getCommunity(userId);

      setCommunity(res);
    };

    fetch();
  }, []);

  if (community === undefined)
    return (
      <ContainerSafeView>
        <ActivityIndicator />
      </ContainerSafeView>
    );

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"List of Community"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {community.map((com, index) => (
          <Pressable key={index} className="flex-row flex-wrap justify-center">
            <CommunityCard
              data={com}
              currentUserId={userId}
              fullWidth
              home={true}
            />
          </Pressable>
        ))}
        <EndMessage text={"Thats all for the recommended community for you."} />
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
