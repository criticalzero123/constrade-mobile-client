import {
  ActivityIndicator,
  Image,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import useCommentPost from "../../hooks/community/useCommentPost";
import { useState } from "react";
import CommunityCommentItem from "./CommunityCommentItem";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

export default function CommunityComments(props) {
  const { communityId, showComment, post, memberInfo } = props;
  const { width, height } = useWindowDimensions();
  const [
    commentPost,
    _,
    deleteComment,
    updateComment,
    commentList,
    setCommentList,
  ] = useCommentPost(communityId);

  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const { user, person } = useGetCurrentUser();

  const [editModeInfo, setEditModeInfo] = useState({
    active: false,
    commentInfo: null,
  });

  const onPressComment = async (postId) => {
    setCommentLoading(true);

    if (editModeInfo.active) {
      const info = {
        ...editModeInfo.commentInfo,
        comment: comment,
      };
      const flag = await updateComment(info);
      if (flag) {
        setCommentList((prevState) => {
          let _newState = prevState;
          let data = _newState.find(
            (_c) =>
              _c.comment.communityPostCommentId === info.communityPostCommentId
          );

          Object.assign(data, { comment: info, userInfo: data.userInfo });
          return _newState;
        });
      } else {
        alert("Something went wrong in updating");
      }
      setEditModeInfo({ active: false, commentInfo: null });
    } else {
      const info = {
        communityPostId: postId,
        commentedByUser: memberInfo.userId,
        comment: comment.trim(),
        dateCommented: new Date(),
      };
      const id = await commentPost(info);

      if (Number.isInteger(id)) {
        setCommentList([
          {
            comment: { ...info, communityPostCommentId: id },
            userInfo: { user, person },
          },
          ...commentList,
        ]);
      } else {
        alert("Something went wrong in adding the comment");
      }
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
        <View className="py-2">
          <View className="flex-row items-center mb-2">
            {commentLoading ? (
              <ActivityIndicator />
            ) : (
              <View className="flex-row mx-5  mt-2 ">
                <Image
                  source={{ uri: user.imageUrl }}
                  style={{
                    width: width * 0.08,
                    height: height * 0.04,
                    borderRadius: 1000,
                  }}
                />
                <TextInput
                  value={comment}
                  onChangeText={setComment}
                  className="border border-gray-400 py-1 px-3 ml-2"
                  placeholder="Comment here..."
                  style={{ width: width * 0.75, borderRadius: 20 }}
                  onSubmitEditing={() =>
                    onPressComment(post.communityPost.communityPostId)
                  }
                />
              </View>
            )}
          </View>

          {commentList &&
            commentList.map((_c, index) => {
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
