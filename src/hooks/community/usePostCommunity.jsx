import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostInCommunity,
  getPostByCommunityId,
  likePost,
  postCommunity,
} from "../../../redux/actions/communityAction";

export default function usePostCommunity(id) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.getPostByCommunityIdReducer);

  useEffect(() => {
    if (id === undefined || !id) return;
    dispatch(getPostByCommunityId(id));
  }, []);

  const post = (info) => {
    dispatch(postCommunity(id, info));
  };

  const deletePost = (postId) => {
    dispatch(deletePostInCommunity(id, postId));
  };

  const like = (postId, userId) => {
    dispatch(likePost(id, postId, userId));
  };

  return { data, post, deletePost, like };
}
