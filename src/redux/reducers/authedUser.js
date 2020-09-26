import { SET_AUTHED_USER, UNSET_AUTHED_USER } from "../actions/authedUser";

let INITIAL_STATE = {
  notLoggedIn: true,
  userId: ""
};

export default function authedUser(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        ...state,
        userId: action.id,
        notLoggedIn: false
      };
    case UNSET_AUTHED_USER:
      return {
        ...state,
        userId: null,
        notLoggedIn: true
      };
    default:
      return state;
  }
}
