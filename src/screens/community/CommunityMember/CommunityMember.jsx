import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import useCommunityMembers from "../../../hooks/community/useCommunityMembers";
import { CommunityRole, communityRoleString } from "../../../../service/enums";
import useGetCommunity from "../../../hooks/community/useGetCommunity";
import { useNavigation } from "@react-navigation/native";

export default function CommunityMember({ route }) {
  const { id, memberInfo } = route.params;
  const { height, width } = useWindowDimensions();
  const [members, remove] = useCommunityMembers(id);
  const { visibility } = useGetCommunity();
  const navigation = useNavigation();
  if (memberInfo === undefined) return;

  return (
    <View className="p-4">
      {visibility === "private" && memberInfo.role === CommunityRole.Owner && (
        <Pressable
          onPress={() => navigation.navigate("SeeMemberRequest", { id })}
        >
          <Text
            className="py-3 text-center bg-[#CC481F] text-white mb-4 font-semibold"
            style={{ borderRadius: 5 }}
          >
            See member request
          </Text>
        </Pressable>
      )}
      {members &&
        members.map((member) => (
          <View
            className="flex-row items-center gap-4 mb-3 justify-between"
            key={member.member.userId}
          >
            <View className="flex-row items-center">
              <Image
                style={{
                  height: height * 0.04,
                  width: width * 0.08,
                  borderRadius: 1000,
                }}
                source={{ uri: member.userImageUrl }}
              />
              <View>
                <Text className="ml-2">{member.userName}</Text>
                <Text className="ml-2 text-gray-400">
                  {communityRoleString(member.member.role)}
                </Text>
              </View>
            </View>

            {memberInfo.role === CommunityRole.Owner &&
              memberInfo.userId !== member.member.userId && (
                <Pressable
                  onPress={() => remove(member.member.communityMemberId)}
                >
                  <Text className="text-red-500">Remove</Text>
                </Pressable>
              )}
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({});
