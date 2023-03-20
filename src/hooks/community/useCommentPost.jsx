import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPost,
  deleteCommentPost,
  editCommentPost,
  getCommentPost,
} from "../../../redux/actions/communityAction";

export default function useCommentPost(communityId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getCommentPostReducer);

  const commentPostCommunity = (info) => {
    return commentPost(communityId, info);
  };

  const getComment = (postId) => {
    dispatch(getCommentPost(communityId, postId));
  };

  const deleteComment = (postId, commentId) => {
    dispatch(deleteCommentPost(communityId, postId, commentId));
  };

  const updateComment = (info) => {
    return editCommentPost(communityId, info);
  };

  return [commentPostCommunity, getComment, deleteComment, updateComment, data];
}
