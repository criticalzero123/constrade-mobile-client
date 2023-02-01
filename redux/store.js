import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  emailAndPasswordRegisterReducer,
  checkEmailReducer,
} from "./reducers/authReducer";

import { addProductReducer } from "./reducers/productReducer";

const finalReducer = combineReducers({
  emailAndPasswordRegisterReducer,
  checkEmailReducer,
  addProductReducer,
});

const composeEnhancers = composeWithDevTools({
  // specify here name, actionsBlacklist, actionCreators and other options
});

const store = createStore(
  finalReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    //   other store enhancers
  )
);

export default store;
