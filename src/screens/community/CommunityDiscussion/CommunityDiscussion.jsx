import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import usePostCommunity from "../../../hooks/community/usePostCommunity";
import useCommentPost from "../../../hooks/community/useCommentPost";
import useReport from "../../../hooks/useReport";
import { CommunityRole, ReportEnum } from "../../../../service/enums";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";

export default function CommunityDiscussion({ route }) {
  const { memberInfo, id } = route.params;
  const { width, height } = useWindowDimensions();
  const { user, person } = useGetCurrentUser();

  const { post, data, deletePost, like } = usePostCommunity(id);
  const [_commentPost, getComments, deleteComment, updateComment, comments] =
    useCommentPost(id);
  const { reportById } = useReport();

  const [postValue, setPostValue] = useState("");
  const [posts, setPosts] = useState(data ? data : []);
  const [comment, setComment] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [editModeInfo, setEditModeInfo] = useState({
    active: false,
    commentInfo: null,
  });

  const onPost = async () => {
    setPostLoading(true);
    if (postValue.trim() === "") return;

    const info = {
      communityId: memberInfo.communityId,
      posterUserId: memberInfo.userId,
      description: postValue,
      createdDate: new Date(),
    };

    const postId = await post(info);
    setPostValue("");

    if (Number.isInteger(postId)) {
      setPosts([
        {
          communityPost: { ...info, communityPostId: postId, like: 0 },
          user: { user: { ...memberInfo, ...user }, person: { ...person } },
        },
        ...posts,
      ]);
    } else {
      alert("Post Doesn't added successfully");
    }
    setPostLoading(false);
  };

  const onPressComment = (postId) => {
    if (editModeInfo.active) {
      const info = {
        ...editModeInfo.commentInfo,
        comment: comment,
      };
      updateComment(info);
      setEditModeInfo({ active: false, commentInfo: null });
    } else {
      const info = {
        communityPostId: postId,
        commentedByUser: memberInfo.userId,
        comment: comment,
        dateCommented: new Date(),
      };
      _commentPost(info);
    }

    setComment("");
  };

  const onPressEdit = (value, info) => {
    setEditModeInfo({ active: true, commentInfo: info });
    setComment(value);
  };

  if (memberInfo === undefined) return;
  return (
    <View className="mt-5">
      <ScrollView>
        {memberInfo && (
          <View className="flex-row items-center">
            <TextInput
              value={postValue}
              onChangeText={setPostValue}
              placeholder="Post here..."
              className="border p-2 w-52 mr-2"
            />
            {postLoading ? (
              <ActivityIndicator />
            ) : (
              <Pressable onPress={onPost}>
                <Text>Post</Text>
              </Pressable>
            )}
          </View>
        )}
        <View>
          {posts &&
            posts.map((post) => {
              const { user, person } = post.user;

              return (
                <View className="bg-gray-200 mb-10">
                  <View className="p-5">
                    <View className="flex-row justify-between mb-6">
                      <View className="flex-row gap-2">
                        <Image
                          source={{ uri: user.imageUrl }}
                          style={{
                            width: width * 0.08,
                            height: height * 0.04,
                            borderRadius: 100,
                          }}
                        />
                        <View>
                          <Text className="capitalize font-semibold">
                            {person.firstName} {person.lastName}
                          </Text>
                          <Text>Date</Text>
                        </View>
                      </View>
                      {(post.user.userId === memberInfo.userId ||
                        memberInfo.role === CommunityRole.Owner) && (
                        <Pressable
                          onPress={() =>
                            deletePost(post.communityPost.communityPostId)
                          }
                        >
                          <Text className="text-red-500">Delete</Text>
                        </Pressable>
                      )}
                      {post.communityPost.posterUserId !==
                        memberInfo.userId && (
                        <Pressable
                          onPress={() =>
                            reportById(
                              memberInfo.userId,
                              post.communityPost.communityPostId,
                              ReportEnum.CommunityPost
                            )
                          }
                        >
                          <Text>Report</Text>
                        </Pressable>
                      )}
                    </View>
                    <Text>{post.communityPost.description}</Text>

                    <View className="flex-row items-center mt-5">
                      <Pressable
                        onPress={() =>
                          like(
                            post.communityPost.communityPostId,
                            memberInfo.userId
                          )
                        }
                      >
                        <View className="flex-row">
                          <AntDesign name="hearto" size={20} color="gray" />
                          <Text className="justify-center ml-1 text-gray-500 font-semibold">
                            {post.communityPost.like}
                          </Text>
                        </View>
                      </Pressable>
                      <View className="flex-row ml-8">
                        <Pressable
                          onPress={() =>
                            getComments(post.communityPost.communityPostId)
                          }
                        >
                          <MaterialCommunityIcons
                            name="comment-multiple-outline"
                            size={20}
                            color="gray"
                          />
                        </Pressable>
                        {post.commentsLength !== 0 ? (
                          <Text className="justify-center ml-1 text-gray-500">
                            {post.commentsLength}
                          </Text>
                        ) : (
                          <Text className="justify-center ml-2 text-gray-500">
                            No discussion yet
                          </Text>
                        )}
                      </View>
                    </View>

                    <View className=" mt-3">
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
                                      <Text className="text-red-500">
                                        Delete
                                      </Text>
                                    </Pressable>

                                    <Pressable
                                      onPress={() =>
                                        onPressEdit(_c.comment, _c)
                                      }
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
                                        _c.communityPostCommentId,
                                        ReportEnum.CommunityPostComment
                                      )
                                    }
                                  >
                                    <Text className="text-gray-500">
                                      Report
                                    </Text>
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
                          <Text>
                            {editModeInfo.active ? "Done" : "Comment"}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
