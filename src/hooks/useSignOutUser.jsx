import { StackActions, useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../redux/actions/authActions";

export const useSignOutUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(signOutUser());
        navigation.dispatch(StackActions.replace("SignIn"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return [onSignOut];
};
