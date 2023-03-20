import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import useCommentPost from "../../hooks/community/useCommentPost";
import { useState } from "react";
import CommunityCommentItem from "./CommunityCommentItem";

export default function CommunityComments({
  communityId,
  showComment,
  post,
  memberInfo,
}) {
  const [_commentPost, _, deleteComment, updateComment, comments] =
    useCommentPost(communityId);

  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const [editModeInfo, setEditModeInfo] = useState({
    active: false,
    commentInfo: null,
  });

  const onPressComment = (postId) => {
    setCommentLoading(true);

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
    setCommentLoading(false);
  };

  const onPressEdit = (value, info) => {
    setEditModeInfo({ active: true, commentInfo: info });
    setComment(value);
  };

  return (
    <>
      {showComment === post.communityPost.communityPostId && (
        <View>
          <View className="flex-row items-center">
            {commentLoading ? (
              <ActivityIndicator />
            ) : (
              <>
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
                  <Text>{editModeInfo.active ? "Done" : "Comment"}</Text>
                </Pressable>
              </>
            )}
          </View>
          {comments &&
            comments.map((_c, index) => {
              const postId = post.communityPost.communityPostId;
              const commentId = _c.comment.communityPostCommentId;

              return (
                <CommunityCommentItem
                  key={index}
                  commentInfo={_c.comment}
                  userInfo={_c.userInfo}
                  memberInfo={memberInfo}
                  onPressEdit={onPressEdit}
                  deleteComment={() => deleteComment(postId, commentId)}
                />
              );
            })}
        </View>
      )}
    </>
  );
}
