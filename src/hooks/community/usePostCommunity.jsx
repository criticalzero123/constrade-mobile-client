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

export default function usePostCommunity(id, userId) {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState();
  const { data } = useSelector((state) => state.getPostByCommunityIdReducer);

  useEffect(() => {
    if (data === undefined) return;

    setPosts(data);
  }, [data]);

  useEffect(() => {
    if (id === undefined) return;
    dispatch(getPostByCommunityId(id, userId));
  }, [id]);

  const post = (info) => {
    return postCommunity(id, info);
  };

  const edit = (info) => {
    return updatePost(id, info);
  };

  const deletePost = (postId) => {
    return deletePostInCommunity(id, postId);
  };

  const like = async (postId, userId) => {
    const res = await likePost(id, postId, userId);

    if (res) {
      const updatedData = data.map((c) => {
        const likeCount = c.communityPost.like;
        const likeFlag = c.isLiked;

        const communityPost = {
          ...c.communityPost,
          like: likeFlag ? likeCount - 1 : likeCount + 1,
        };

        if (c.communityPost.communityPostId === postId) {
          return { ...c, communityPost: communityPost, isLiked: !c.isLiked };
        }

        return c;
      });

      dispatch({
        type: "GET_POST_BY_COMMUNITY_ID_SUCCESS",
        payload: updatedData,
      });
    } else {
      alert("Something went wrong.");
    }
  };

  return { posts, setPosts, post, deletePost, like, edit };
}
