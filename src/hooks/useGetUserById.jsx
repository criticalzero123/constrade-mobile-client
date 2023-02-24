import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions/userActions";

export default function useGetUserById(userId) {
  const dispatch = useDispatch();
  const { data, loading, error, success } = useSelector(
    (state) => state.getUserByIdReducer
  );

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId, dispatch]);

  return [data, loading, error, success];
}
