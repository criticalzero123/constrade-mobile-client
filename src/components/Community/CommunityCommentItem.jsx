import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import useReport from "../../hooks/useReport";
import { ReportEnum } from "../../../service/enums";

export default function CommunityCommentItem(props) {
  const { commentInfo, userInfo, memberInfo, onPressEdit, deleteComment } =
    props;

  const { reportById } = useReport();
  const { width, height } = useWindowDimensions();
  return (
    <View className="flex-row px-5 py-1 ">
      <Image
        style={{
          width: width * 0.08,
          height: height * 0.04,
          borderRadius: 1000,
        }}
        source={{ uri: userInfo.user.imageUrl }}
      />
      <View className="ml-2">
        <View className="bg-gray-200 p-2" style={{ borderRadius: 10 }}>
          <Text className="capitalize text-gray-500 font-semibold">
            {userInfo.person.firstName} {userInfo.person.lastName}
          </Text>
          <Text className="mt-1">{commentInfo.comment}</Text>
        </View>
        <View className="flex-row items-center ml-2">
          {commentInfo.commentedByUser === memberInfo.userId ? (
            <>
              <Pressable onPress={deleteComment}>
                <Text className="text-red-500">Delete</Text>
              </Pressable>

              <Pressable
                onPress={() => onPressEdit(commentInfo.comment, commentInfo)}
                className="ml-5"
              >
                <Text className="text-red-500">Edit</Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={() =>
                reportById(
                  memberInfo.userId,
                  commentInfo.communityPostCommentId,
                  ReportEnum.CommunityPostComment
                )
              }
            >
              <Text className="text-gray-500">Report</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
