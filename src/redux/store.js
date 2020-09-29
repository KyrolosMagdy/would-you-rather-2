import { createStore } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/rootReducer";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

const middleWares = [thunk, logger];

export const store = createStore(rootReducers, applyMiddleware(...middleWares));

export const persistor = persistStore(store);
