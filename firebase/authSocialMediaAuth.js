import firebase from "./firebase-config";

const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithCredential(provider)
    .then(async (res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;
