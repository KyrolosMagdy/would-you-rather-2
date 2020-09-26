import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import handleNavbarReducer from "./toggleNavBar";

export default combineReducers({
  authedUser,
  users,
  questions,
  handleNavbarReducer
});
