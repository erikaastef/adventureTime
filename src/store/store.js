// import { createStore, applyMiddleware, compose } from 'redux'

// import createHistory from 'history/createBrowserHistory'
// import thunk from 'redux-thunk'
// import { routerMiddleware } from 'react-router-redux'
// import reducer from './reducers'
// const history = createHistory()
// const middleware = routerMiddleware(history)
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, middleware)))
// export { store, history }


import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from "react-router-redux";
import * as reducers from "./reducers";
const reducer = combineReducers({ ...reducers });
const history = createHistory()
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, middleware))
);