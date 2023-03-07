import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import useCommunityMembers from "../../../hooks/community/useCommunityMembers";
import { CommunityRole } from "../../../../service/enums";

export default function CommunityMember({ route }) {
  const { id, memberInfo } = route.params;
  const [members, remove] = useCommunityMembers(id);

  return (
    <View>
      {members &&
        members.map((member) => (
          <View className="flex-row items-center gap-4">
            <Text>
              {member.userInfo.person.firstName}{" "}
              {member.userInfo.person.lastName}
            </Text>

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
