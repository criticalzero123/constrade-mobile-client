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

export default function CommunityMember({ route }) {
  const { id, memberInfo } = route.params;
  const { height, width } = useWindowDimensions();

  const [members, remove] = useCommunityMembers(id);
  if (memberInfo) {
    return (
      <View className="p-4">
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
}

const styles = StyleSheet.create({});
