import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  emailAndPasswordRegisterReducer,
  emailAndPasswordAuthLoginReducer,
  requestOtpEmailReducer,
  verifyOtpReducer,
  changePasswordEmailReducer,
} from "./reducers/authReducer";

import {
  updatePersonInfoReducer,
  userInfoReducer,
  getAllUsersReducer,
  getUserByIdReducer,
} from "./reducers/userReducer";

import { followCountReducer } from "./reducers/followReducer";

import {
  getWalletUserReducer,
  getAllTransactionsWalletUserReducer,
  getAllWalletUserReducer,
} from "./reducers/walletReducer";

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
  getAllProductsReducer,
  getProductByIdReducer,
  deleteProductByIdReducer,
  getFavoriteByUserIdReducer,
  getProductBoostReducer,
} from "./reducers/productReducer";
import {
  getMessagesByUserIdsReducer,
  getChatByUserIdReducer,
} from "./reducers/userMessageReducer";

import {
  subscribeUserReducer,
  getSubscriptionHistoryReducer,
} from "./reducers/subscriptionReducer";

import { getNotificationUserReducer } from "./reducers/notificationReducer";

import {
  getMyCommunityReducer,
  getCommunityByIdReducer,
  deleteCommunityReducer,
  getAllCommunityReducer,
  getPostByCommunityIdReducer,
  getCommentPostReducer,
  getCommunityMembersReducer,
  deleteCommunityMemberByIdReducer,
  getAllMyCommunityJoinedReducer,
  getPopularCommunityReducer,
  communityData,
} from "./reducers/communityReducer";

const finalReducer = combineReducers({
  emailAndPasswordRegisterReducer,
  userInfoReducer,
  emailAndPasswordAuthLoginReducer,
  requestOtpEmailReducer,
  verifyOtpReducer,
  getOtherReviewsUserReducer,
  updatePersonInfoReducer,
  getAllUsersReducer,
  getUserByIdReducer,
  getMessagesByUserIdsReducer,
  getChatByUserIdReducer,
  getProductByUserReducer,
  getWalletUserReducer,
  getAllTransactionsWalletUserReducer,
  getAllWalletUserReducer,
  getAllProductsReducer,
  getProductByIdReducer,
  getProductMessagesReducer,
  getProductChatByUserIdReducer,

  changePasswordEmailReducer,
  deleteProductByIdReducer,
  getFavoriteByUserIdReducer,
  subscribeUserReducer,
  getSubscriptionHistoryReducer,
  getNotificationUserReducer,
  getMyCommunityReducer,
  getCommunityByIdReducer,
  deleteCommunityReducer,
  getAllCommunityReducer,
  getPostByCommunityIdReducer,
  getCommentPostReducer,
  getCommunityMembersReducer,
  deleteCommunityMemberByIdReducer,
  getNotRatedReducer,
  getMyReviewsUserReducer,
  followCountReducer,
  getAllMyCommunityJoinedReducer,
  getProductBoostReducer,
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
