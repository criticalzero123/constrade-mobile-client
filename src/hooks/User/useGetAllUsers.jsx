import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/userActions";

export default function useGetAllUsers() {
  const { data } = useSelector((state) => state.getAllUsersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return [(users = data)];
}
