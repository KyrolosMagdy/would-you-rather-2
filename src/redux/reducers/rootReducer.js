import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import handleNavbarReducer from "./toggleNavBar";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authedUser", "users", "questions"]
};

const rootReducer = combineReducers({
  authedUser,
  users,
  questions,
  handleNavbarReducer
});

export default persistReducer(persistConfig, rootReducer);
