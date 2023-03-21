import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostInCommunity,
  getPostByCommunityId,
  likePost,
  postCommunity,
  updatePost,
} from "../../../redux/actions/communityAction";

export default function usePostCommunity(id) {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState();
  const { data } = useSelector((state) => state.getPostByCommunityIdReducer);

  useEffect(() => {
    if (data === undefined) return;

    setPosts(data);
  }, [data]);

  useEffect(() => {
    if (id === undefined || !id) return;
    dispatch(getPostByCommunityId(id));
  }, []);

  const post = (info) => {
    return postCommunity(id, info);
  };

  const edit = (info) => {
    return updatePost(id, info);
  };

  const deletePost = (postId) => {
    return deletePostInCommunity(id, postId);
  };

  const like = (postId, userId) => {
    dispatch(likePost(id, postId, userId));
  };

  return { posts, setPosts, post, deletePost, like, edit };
}
