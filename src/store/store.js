import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import * as reducers from "./reducers";

const reducer = combineReducers({ ...reducers });

// ✅ use Redux DevTools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;