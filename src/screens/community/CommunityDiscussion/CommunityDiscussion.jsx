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

export default function CommunityDiscussion({ route }) {
  const { memberInfo, id } = route.params;
  const { post, data, deletePost } = usePostCommunity(id);
  const [value, setValue] = useState("");

  const onPost = () => {
    if (value.trim() === "") return;

    const info = {
      communityId: memberInfo.communityId,
      posterUserId: memberInfo.userId,
      description: value,
      createdDate: new Date(),
    };

    post(info.communityId, info);
  };

  return (
    <View style={{ paddingHorizontal: 20 }} className="mt-5">
      <ScrollView>
        {memberInfo && (
          <View className="flex-row items-center">
            <TextInput
              value={value}
              onChangeText={setValue}
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
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
