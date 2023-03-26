import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useMemberRequest from "../../hooks/community/useMemberRequest";
import MemberRequestsItem from "../../components/Community/MemberRequestsItem";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";

export default function SeeMemberRequest({ route }) {
  const { id } = route.params;

  const [requests, accept, reject] = useMemberRequest(id);

  return (
    <ContainerSafeView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="my-2" />
        {requests &&
          (requests.length === 0 ? (
            <View>
              <Text>No Requests</Text>
            </View>
          ) : (
            requests.map((req, index) => (
              <MemberRequestsItem
                key={index}
                data={req}
                accept={accept}
                reject={reject}
              />
            ))
          ))}
      </ScrollView>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
