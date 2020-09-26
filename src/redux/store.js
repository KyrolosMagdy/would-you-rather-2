import { createStore } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/rootReducer";
import { applyMiddleware } from "redux";
import logger from "redux-logger";

const middleWares = [thunk, logger];

const store = createStore(rootReducers, applyMiddleware(...middleWares));

export default store;
