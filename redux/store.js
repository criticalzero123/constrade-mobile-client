import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  emailAndPasswordRegisterReducer,
  checkEmailReducer,
  googleAuthLoginReducer,
  googleAuthRegisterReducer,
  emailAndPasswordAuthLoginReducer,
  requestOtpEmailReducer,
  verifyOtpReducer,
} from "./reducers/authReducer";

import {
  updatePersonInfoReducer,
  userInfoReducer,
  getAllUsersReducer,
  getUserByIdReducer,
} from "./reducers/userReducer";
import {
  getFollowAndFollowersUserReducer,
  followUserReducer,
  isFollowUserReducer,
} from "./reducers/followReducer";
import { getReviewsUserReducer } from "./reducers/reviewReducer";
import { addProductReducer } from "./reducers/productReducer";

const finalReducer = combineReducers({
  emailAndPasswordRegisterReducer,
  checkEmailReducer,
  addProductReducer,
  googleAuthLoginReducer,
  googleAuthRegisterReducer,
  userInfoReducer,
  emailAndPasswordAuthLoginReducer,
  requestOtpEmailReducer,
  verifyOtpReducer,
  getFollowAndFollowersUserReducer,
  getReviewsUserReducer,
  updatePersonInfoReducer,
  getAllUsersReducer,
  getUserByIdReducer,
  followUserReducer,
  isFollowUserReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_SIGN_OUT") {
    return finalReducer({}, action);
  }

  return finalReducer(state, action);
};

const composeEnhancers = composeWithDevTools({
  // specify here name, actionsBlacklist, actionCreators and other options
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    //   other store enhancers
  )
);

export default store;
