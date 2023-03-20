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
  changePasswordEmailReducer,
} from "./reducers/authReducer";

import {
  updatePersonInfoReducer,
  userInfoReducer,
  getAllUsersReducer,
  getUserByIdReducer,
} from "./reducers/userReducer";

import {
  getWalletUserReducer,
  getAllTransactionsWalletUserReducer,
  getAllWalletUserReducer,
  sendMoneyReducer,
} from "./reducers/walletReducer";

import {
  getFollowAndFollowersUserReducer,
  followUserReducer,
  isFollowUserReducer,
} from "./reducers/followReducer";

import {
  getProductMessagesReducer,
  getProductChatByUserIdReducer,
} from "./reducers/productMessageReducer";

import {
  getOtherReviewsUserReducer,
  getNotRatedReducer,
  getMyReviewsUserReducer,
  getMyAverageRateReducer,
} from "./reducers/reviewReducer";

import {
  addProductReducer,
  getProductByUserReducer,
  getAllProductsReducer,
  getProductByIdReducer,
  deleteProductByIdReducer,
  addFavoriteReducer,
  deleteFavoriteReducer,
  getFavoriteByUserIdReducer,
  getProductBoostReducer,
} from "./reducers/productReducer";
import {
  getMessagesByUserIdsReducer,
  getChatByUserIdReducer,
  deleteMessageByIdReducer,
} from "./reducers/userMessageReducer";

import {
  soldProductReducer,
  getProductTransactionReducer,
} from "./reducers/transactionReducer";

import {
  subscribeUserReducer,
  getSubscriptionHistoryReducer,
} from "./reducers/subscriptionReducer";

import { getNotificationUserReducer } from "./reducers/notificationReducer";

import {
  createCommunityReducer,
  getMyCommunityReducer,
  getCommunityByIdReducer,
  deleteCommunityReducer,
  getAllCommunityReducer,
  joinCommunityByIdReducer,
  getPostByCommunityIdReducer,
  deletePostInCommunityReducer,
  getCommentPostReducer,
  deleteCommentPostReducer,
  likePostReducer,
  getCommunityMembersReducer,
  deleteCommunityMemberByIdReducer,
  getAllMyCommunityJoinedReducer,
  getPopularCommunityReducer,
} from "./reducers/communityReducer";

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
  getOtherReviewsUserReducer,
  updatePersonInfoReducer,
  getAllUsersReducer,
  getUserByIdReducer,
  followUserReducer,
  isFollowUserReducer,
  getMessagesByUserIdsReducer,
  getChatByUserIdReducer,
  getProductByUserReducer,
  getWalletUserReducer,
  getAllTransactionsWalletUserReducer,
  getAllWalletUserReducer,
  sendMoneyReducer,
  getAllProductsReducer,
  getProductByIdReducer,
  getProductMessagesReducer,
  getProductChatByUserIdReducer,
  soldProductReducer,
  changePasswordEmailReducer,
  deleteProductByIdReducer,
  addFavoriteReducer,
  deleteFavoriteReducer,
  getFavoriteByUserIdReducer,
  subscribeUserReducer,
  getSubscriptionHistoryReducer,
  deleteMessageByIdReducer,
  getNotificationUserReducer,
  createCommunityReducer,
  getMyCommunityReducer,
  getCommunityByIdReducer,
  deleteCommunityReducer,
  getAllCommunityReducer,
  joinCommunityByIdReducer,
  getPostByCommunityIdReducer,
  deletePostInCommunityReducer,
  getCommentPostReducer,
  deleteCommentPostReducer,
  likePostReducer,
  getCommunityMembersReducer,
  deleteCommunityMemberByIdReducer,
  getNotRatedReducer,
  getMyReviewsUserReducer,
  getMyAverageRateReducer,
  getAllMyCommunityJoinedReducer,
  getProductTransactionReducer,
  getProductBoostReducer,
  getPopularCommunityReducer,
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
