import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const createWithEmailAndPassword = (userInfo) => {
  return createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then((userCredentials) => {
      const user = {
        ...userInfo,
        firebaseId: userCredentials.user.uid,
      };

      return Promise.resolve(user);
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;

      return Promise.reject({ code: errorCode, message: errorMessage });
    });
};
