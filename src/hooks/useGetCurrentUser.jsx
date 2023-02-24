import { useSelector } from "react-redux";

export default function useGetCurrentUser() {
  const selector = useSelector((state) => state.userInfoReducer);
  const { user, person } = selector.user;

  return { user, person };
}
