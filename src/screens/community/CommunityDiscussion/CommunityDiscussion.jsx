import {
  ActivityIndicator,
  Alert,
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
import PrivateMessageComponent from "../../../components/Community/PrivateMessageComponent";
import useGetCommunity from "../../../hooks/community/useGetCommunity";
import BottomModal from "../../../components/modal/BottomModal";
import { useNavigation } from "@react-navigation/native";

export default function CommunityDiscussion() {
  const { width, height } = useWindowDimensions();
  const currentUserInfo = useGetCurrentUser();
  const { user, person } = currentUserInfo;
  const [_, getComments] = useCommentPost(id);
  const { visibility, currentMember, id } = useGetCommunity();
  const { post, deletePost, like, posts, setPosts, edit } = usePostCommunity(
    id,
    user.userId
  );
  const navigation = useNavigation();
  const { reportById } = useReport();

  const [postEditValue, setPostEditValue] = useState();

  const [postValue, setPostValue] = useState("");
  const [showComment, setShowComment] = useState(-1);
  const [editVal, setEditVal] = useState("");
  const [postVisible, setPostVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const onPost = async () => {
    setPostLoading(true);
    if (postValue.trim() === "") return;

    const info = {
      communityId: currentMember.communityId,
      posterUserId: currentMember.userId,
      description: postValue,
      createdDate: new Date(),
    };

    const postId = await post(info);
    setPostValue("");

    if (Number.isInteger(postId)) {
      setPosts([
        {
          communityPost: { ...info, communityPostId: postId, like: 0 },
          user: { user: { ...currentMember, ...user }, person: { ...person } },
          isLiked: false,
          isMember: true,
          commentsLength: 0,
        },
        ...posts,
      ]);
    } else {
      alert("Post Doesn't added successfully");
    }
    setPostLoading(false);
    setPostVisible(!postVisible);
  };

  const onPostEdit = async () => {
    const info = {
      ...postEditValue.communityPost,
      description: editVal,
    };

    const flag = await edit(info);

    if (flag) {
      setPosts((prevState) => {
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

  if (currentMember === undefined && visibility === "private")
    return <PrivateMessageComponent text={"Discussions"} />;

  // For the non-member and visibility public
  if (currentMember === undefined)
    return (
      <View>
        {posts &&
          (posts.length !== 0 ? (
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
                    </View>
                    <View className="ml-10">
                      <Text>{post.communityPost.description}</Text>
                      <View className="border-b border-b-gray-400 my-3" />
                      <View className="flex-row items-center">
                        <Pressable onPress={() => alert("Join First")}>
                          <View className="flex-row">
                            <AntDesign
                              name="hearto"
                              size={20}
                              color={post.isLiked ? "red" : "gray"}
                            />
                            <Text
                              className={`justify-center ml-1  font-semibold ${
                                post.isLiked ? "text-red-500" : "text-gray-500"
                              }`}
                            >
                              {post.communityPost.like}
                            </Text>
                          </View>
                        </Pressable>
                        <View className="flex-row ml-8">
                          <Pressable onPress={() => alert("Join First")}>
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
                </View>
              );
            })
          ) : (
            <Text>No Posts</Text>
          ))}
      </View>
    );

  return (
    <Provider>
      <ScrollView>
        <View className="mt-5">
          {currentMember && (
            <Pressable
              className="items-center py-4 bg-[#CC481F] mx-4 mb-5"
              style={{ borderRadius: 10 }}
              onPress={() => setPostVisible(!postVisible)}
            >
              <Text className="text-white">Post Something</Text>
            </Pressable>
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
                          <Pressable
                            onPress={() => {
                              if (currentUserInfo.user.userId !== user.userId) {
                                navigation.navigate("User", {
                                  screen: "OtherUserProfile",
                                  params: { userId: user.userId },
                                });
                              }
                            }}
                          >
                            <Image
                              source={{ uri: user.imageUrl }}
                              style={{
                                width: width * 0.08,
                                height: height * 0.04,
                                borderRadius: 100,
                              }}
                            />
                          </Pressable>
                          <View>
                            <Text className="capitalize font-semibold">
                              {person.firstName} {person.lastName}{" "}
                              {!post.isMember && (
                                <Text className="text-gray-400">
                                  {" "}
                                  (Removed)
                                </Text>
                              )}
                            </Text>

                            <Text className="text-gray-400">
                              {new Date(
                                post.communityPost.createdDate
                              ).toLocaleDateString()}
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row gap-2">
                          {user.userId === currentMember.userId && (
                            <Pressable
                              onPress={() => {
                                setPostEditValue(post);
                                setEditVisible(true);
                              }}
                            >
                              <Text>Edit</Text>
                            </Pressable>
                          )}
                          {(user.userId === currentMember.userId ||
                            currentMember.role === CommunityRole.Owner) && (
                            <Pressable
                              onPress={() => {
                                Alert.alert(
                                  "Are you sure?",
                                  "This is not reversible!",
                                  [
                                    {
                                      text: "Yes",
                                      onPress: () =>
                                        onDeletePost(
                                          post.communityPost.communityPostId
                                        ),
                                    },
                                    {
                                      text: "Cancel",
                                      style: "cancel",
                                    },
                                  ]
                                );
                              }}
                            >
                              <Text className="text-red-500">Delete</Text>
                            </Pressable>
                          )}
                        </View>
                        {post.communityPost.posterUserId !==
                          currentMember.userId && (
                          <Pressable
                            onPress={() =>
                              reportById(
                                currentMember.userId,
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
                                currentMember.userId
                              )
                            }
                          >
                            <View className="flex-row">
                              <AntDesign
                                name="hearto"
                                size={20}
                                color={post.isLiked ? "red" : "gray"}
                              />
                              <Text
                                className={`justify-center ml-1  font-semibold ${
                                  post.isLiked
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                              >
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
                      currentMember={currentMember}
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
      <BottomModal setIsVisible={setPostVisible} isVisible={postVisible}>
        <TextInput
          value={postValue}
          onChangeText={setPostValue}
          placeholder="Something here..."
          className="border p-2 w-full border-gray-300 mb-5"
          style={{ borderRadius: 5 }}
        />
        {postLoading ? (
          <ActivityIndicator />
        ) : (
          <Pressable
            onPress={onPost}
            className="items-center bg-[#CC481F] py-4"
            style={{ borderRadius: 5 }}
          >
            <Text className="text-white">Post</Text>
          </Pressable>
        )}
      </BottomModal>
    </Provider>
  );
}

const styles = StyleSheet.create({});
