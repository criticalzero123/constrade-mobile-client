import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userInfoReducer, getUserByIdReducer } from "./reducers/userReducer";

import { followCountReducer } from "./reducers/followReducer";

import { getAllWalletUserReducer } from "./reducers/walletReducer";

import {
  getProductMessagesReducer,
  getProductChatByUserIdReducer,
} from "./reducers/productMessageReducer";

import {
  getOtherReviewsUserReducer,
  getNotRatedReducer,
  getMyReviewsUserReducer,
} from "./reducers/reviewReducer";

import {
  getProductByUserReducer,
  getProductByIdReducer,
  deleteProductByIdReducer,
  getFavoriteByUserIdReducer,
} from "./reducers/productReducer";
import { getMessagesByUserIdsReducer } from "./reducers/userMessageReducer";

import {
  getMyCommunityReducer,
  getCommunityByIdReducer,
  deleteCommunityReducer,
  getAllCommunityReducer,
  getCommentPostReducer,
  getAllMyCommunityJoinedReducer,
  getPopularCommunityReducer,
  communityData,
} from "./reducers/communityReducer";

const finalReducer = combineReducers({
  userInfoReducer,
  getOtherReviewsUserReducer,
  getUserByIdReducer,
  getMessagesByUserIdsReducer,
  getProductByUserReducer,
  getAllWalletUserReducer,
  getProductByIdReducer,
  getProductMessagesReducer,
  getProductChatByUserIdReducer,
  deleteProductByIdReducer,
  getFavoriteByUserIdReducer,
  getMyCommunityReducer,
  getCommunityByIdReducer,
  deleteCommunityReducer,
  getAllCommunityReducer,
  getCommentPostReducer,
  getNotRatedReducer,
  getMyReviewsUserReducer,
  followCountReducer,
  getAllMyCommunityJoinedReducer,
  getPopularCommunityReducer,
  communityData,
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
