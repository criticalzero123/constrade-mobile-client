import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import usePostCommunity from "../../../hooks/community/usePostCommunity";
import useCommentPost from "../../../hooks/community/useCommentPost";
import useReport from "../../../hooks/useReport";
import { ReportEnum } from "../../../../service/enums";

export default function CommunityDiscussion({ route }) {
  const { memberInfo, id } = route.params;

  const { post, data, deletePost, like } = usePostCommunity(id);
  const [_commentPost, getComments, deleteComment, comments] =
    useCommentPost(id);
  const { reportById } = useReport();

  const [postValue, setPostValue] = useState("");
  const [comment, setComment] = useState("");

  const onPost = () => {
    if (postValue.trim() === "") return;

    const info = {
      communityId: memberInfo.communityId,
      posterUserId: memberInfo.userId,
      description: postValue,
      createdDate: new Date(),
    };

    post(info);
  };

  const onPressComment = (postId) => {
    const info = {
      communityPostId: postId,
      commentedByUser: memberInfo.userId,
      comment: comment,
      dateCommented: new Date(),
    };
    _commentPost(info);

    setComment("");
  };

  return (
    <View style={{ paddingHorizontal: 20 }} className="mt-5">
      <ScrollView>
        {memberInfo && (
          <View className="flex-row items-center">
            <TextInput
              value={postValue}
              onChangeText={setPostValue}
              placeholder="Post here..."
              className="border p-2 w-52 mr-2"
            />
            <Pressable onPress={onPost}>
              <Text>Post</Text>
            </Pressable>
          </View>
        )}
        <View>
          <Text className="mb-10">POSTS</Text>

          {data &&
            data.map((post) => (
              <View>
                <Text>{post.communityPost.description}</Text>
                <View className="p-2 border">
                  <Pressable
                    onPress={() =>
                      getComments(post.communityPost.communityPostId)
                    }
                  >
                    <Text className="mb-2">Comments</Text>
                  </Pressable>
                  {comments &&
                    comments.map(
                      (_c) =>
                        _c.communityPostId ===
                          post.communityPost.communityPostId && (
                          <View className="flex-row items-center">
                            <Text className="mr-3"> {_c.comment}</Text>
                            {_c.commentedByUser === memberInfo.userId ? (
                              <>
                                <Pressable
                                  onPress={() =>
                                    deleteComment(
                                      post.communityPost.communityPostId,
                                      _c.communityPostCommentId
                                    )
                                  }
                                >
                                  <Text className="text-red-500">Delete</Text>
                                </Pressable>

                                <Pressable onPress={() => alert("edited")}>
                                  <Text className="text-red-500">Edit</Text>
                                </Pressable>
                              </>
                            ) : (
                              <Pressable
                                onPress={() =>
                                  reportById(
                                    memberInfo.userId,
                                    _c.communityPostCommentId,
                                    ReportEnum.CommunityPostComment
                                  )
                                }
                              >
                                <Text className="text-gray-500">Report</Text>
                              </Pressable>
                            )}
                          </View>
                        )
                    )}

                  <View className="flex-row items-center">
                    <TextInput
                      value={comment}
                      onChangeText={setComment}
                      className="border p-2 w-52 mr-2"
                      placeholder="Comment here..."
                    />
                    <Pressable
                      onPress={() =>
                        onPressComment(post.communityPost.communityPostId)
                      }
                    >
                      <Text>Comment</Text>
                    </Pressable>
                  </View>
                  {post.user.userId === memberInfo.userId && (
                    <Pressable
                      onPress={() =>
                        deletePost(
                          post.communityPost.communityPostId,
                          memberInfo.userId
                        )
                      }
                    >
                      <Text className="text-red-500 mt-2">Delete</Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() =>
                      like(
                        post.communityPost.communityPostId,
                        memberInfo.userId
                      )
                    }
                  >
                    <View className="flex-row">
                      <Text className="mt-5">
                        {post.communityPost.like} Like
                      </Text>
                      {post.communityPost.posterUserId !==
                        memberInfo.userId && (
                        <Pressable
                          onPress={() =>
                            reportById(
                              memberInfo.userId,
                              post.communityPost.posterUserId,
                              ReportEnum.CommunityPost
                            )
                          }
                        >
                          <Text className="mt-5 ml-5">Report</Text>
                        </Pressable>
                      )}
                    </View>
                  </Pressable>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
