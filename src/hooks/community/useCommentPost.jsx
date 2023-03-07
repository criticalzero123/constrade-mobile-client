import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPost,
  deleteCommentPost,
  getCommentPost,
} from "../../../redux/actions/communityAction";

export default function useCommentPost(communityId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getCommentPostReducer);

  const commentPostCommunity = (info) => {
    dispatch(commentPost(communityId, info));
  };

  const getComment = (postId) => {
    dispatch(getCommentPost(communityId, postId));
  };

  const deleteComment = (postId, commentId) => {
    dispatch(deleteCommentPost(communityId, postId, commentId));
  };

  return [commentPostCommunity, getComment, deleteComment, data];
}
