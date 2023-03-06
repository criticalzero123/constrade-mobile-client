import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostInCommunity,
  getPostByCommunityId,
  postCommunity,
} from "../../../redux/actions/communityAction";

export default function usePostCommunity(id) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.getPostByCommunityIdReducer);

  useEffect(() => {
    if (id === undefined || !id) return;
    dispatch(getPostByCommunityId(id));
  }, []);

  const post = (communityId, info) => {
    dispatch(postCommunity(communityId, info));
  };

  const deletePost = (communityId, postId, userId) => {
    dispatch(deletePostInCommunity(communityId, postId, userId));
  };

  return { data, post, deletePost };
}
