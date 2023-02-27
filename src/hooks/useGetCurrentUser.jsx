import { useSelector } from "react-redux";

export default function useGetCurrentUser() {
  const selector = useSelector((state) => state.userInfoReducer);

  return selector.user === undefined
    ? { user: undefined, person: undefined }
    : ({ user, person } = selector.user);
}
