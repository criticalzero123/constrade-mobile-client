import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../redux/actions/authActions";
import { clearAllAsyncStorage } from "../../service/savingStorageService";

export const useSignOutUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        clearAllAsyncStorage();
        dispatch(signOutUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return [onSignOut];
};
