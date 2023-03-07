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

export default function CommunityDiscussion({ route }) {
  const { memberInfo, id } = route.params;

  const { post, data, deletePost } = usePostCommunity(id);
  const [_commentPost, getComments, deleteComment, comments] =
    useCommentPost(id);

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

    post(info.communityId, info);
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
                            {_c.commentedByUser === memberInfo.userId && (
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
                          post.communityPost.communityId,
                          post.communityPost.communityPostId,
                          memberInfo.userId
                        )
                      }
                    >
                      <Text className="text-red-500 mt-2">Delete</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
