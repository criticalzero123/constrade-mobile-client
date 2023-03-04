import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deleteFavorite,
  getFavoriteByUserId,
} from "../../../redux/actions/productActions";

export default function useFavorite(userId) {
  const dispatch = useDispatch();

  const { loading, data } = useSelector(
    (state) => state.getFavoriteByUserIdReducer
  );

  useEffect(() => {
    if (userId == undefined || !userId || loading) return;

    dispatch(getFavoriteByUserId(userId));

    return () => {
      dispatch({ type: "ADD_FAVORITE_LEAVE  " });
      dispatch({ type: "DELETE_FAVORITE_LEAVE  " });
      dispatch({ type: "GET_FAVORITE_LEAVE  " });
    };
  }, [userId]);

  const addToFavorite = (info) => {
    dispatch(addFavorite(info));
  };

  const deleteFromFavorite = (favoriteId) => {
    dispatch(deleteFavorite(favoriteId));
  };

  return { data, addToFavorite, deleteFromFavorite };
}
