import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavorite,
  getFavoriteByUserId,
} from "../../../redux/actions/productActions";

export default function useFavorite(userId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getFavoriteByUserIdReducer);

  const [favorites, setFavorites] = useState();

  useEffect(() => {
    if (data === undefined) return;

    setFavorites(data);
  }, [data]);

  useEffect(() => {
    if (userId == undefined) return;

    dispatch(getFavoriteByUserId(userId));

    return () => {
      dispatch({ type: "GET_FAVORITE_LEAVE  " });
    };
  }, [userId]);

  const deleteFromFavorite = (favoriteId) => {
    return deleteFavorite(favoriteId);
  };

  return { favorites, setFavorites, deleteFromFavorite };
}
