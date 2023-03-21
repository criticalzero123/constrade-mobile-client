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
import CommunityComments from "../../../components/Community/CommunityComments";
import { Button, Dialog, Portal, Provider } from "react-native-paper";

export default function CommunityDiscussion({ route }) {
  const { memberInfo, id } = route.params;

  const { width, height } = useWindowDimensions();
  const { user, person } = useGetCurrentUser();
  const [_, getComments] = useCommentPost(id);

  const { post, deletePost, like, posts, setPosts, edit } =
    usePostCommunity(id);

  const { reportById } = useReport();

  const [postEditValue, setPostEditValue] = useState();

  const [postValue, setPostValue] = useState("");
  const [showComment, setShowComment] = useState(-1);
  const [editVal, setEditVal] = useState("");

  const [editVisible, setEditVisible] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

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

  const onPostEdit = async () => {
    const info = {
      ...postEditValue.communityPost,
      description: editVal,
    };

    const flag = await edit(info);

    if (flag) {
      setPosts((prevState) => {
        console.log(prevState);
        let newState = prevState;
        let data = newState.find(
          (_p) => _p.communityPost.communityPostId === info.communityPostId
        );

        Object.assign(data, {
          user: postEditValue.user,
          communityPost: info,
          commentsLength: postEditValue.commentsLength,
        });

        return newState;
      });
    } else {
      alert("Something went wrong in editing the post.");
    }

    setEditVisible(false);
    setEditVal("");
  };

  const onDeletePost = async (id) => {
    const flag = await deletePost(id);
    if (flag) {
      const newPost = posts.filter(
        (_p) => _p.communityPost.communityPostId !== id
      );
      setPosts(newPost);
    } else alert("Something went wrong in deleting post");
  };

  if (memberInfo === undefined) return;
  return (
    <Provider>
      <ScrollView>
        <View className="mt-5">
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
              posts.map((post, index) => {
                const { user, person } = post.user;

                return (
                  <View className=" mb-10" key={index}>
                    <View className="p-5 bg-gray-200">
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
                        <View className="flex-row gap-2">
                          {user.userId === memberInfo.userId && (
                            <Pressable
                              onPress={() => {
                                setPostEditValue(post);
                                setEditVisible(true);
                              }}
                            >
                              <Text>Edit</Text>
                            </Pressable>
                          )}
                          {(user.userId === memberInfo.userId ||
                            memberInfo.role === CommunityRole.Owner) && (
                            <Pressable
                              onPress={() =>
                                onDeletePost(post.communityPost.communityPostId)
                              }
                            >
                              <Text className="text-red-500">Delete</Text>
                            </Pressable>
                          )}
                        </View>
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
                      <View className="ml-10">
                        <Text>{post.communityPost.description}</Text>
                        <View className="border-b border-b-gray-400 my-3" />
                        <View className="flex-row items-center">
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
                              onPress={() => {
                                getComments(post.communityPost.communityPostId);
                                setShowComment(
                                  post.communityPost.communityPostId
                                );
                              }}
                            >
                              <MaterialCommunityIcons
                                name="comment-multiple-outline"
                                size={20}
                                color="gray"
                              />
                            </Pressable>

                            {post.commentsLength !== undefined &&
                            post.commentsLength !== 0 ? (
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
                      </View>
                    </View>
                    <CommunityComments
                      communityId={id}
                      showComment={showComment}
                      post={post}
                      memberInfo={memberInfo}
                    />
                  </View>
                );
              })}
          </View>
        </View>
        <Portal>
          <Dialog visible={editVisible} onDismiss={() => setEditVisible(false)}>
            <Dialog.Title>Edit Post</Dialog.Title>
            <Dialog.Content>
              <TextInput
                className="border p-2 "
                value={editVal}
                onChangeText={(text) => setEditVal(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={onPostEdit}>Done</Button>
              <Button
                onPress={() => {
                  setEditVisible(false);
                  setEditVal("");
                }}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({});
