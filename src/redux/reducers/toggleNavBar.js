import { HANDLE_NAV_BAR_STATE } from "../actions/toggleNavBar";

let initialState = {
  isNavOpen: false
};

export default function handleNavbarReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_NAV_BAR_STATE:
      return {
        ...state,
        isNavOpen: !state.isNavOpen
      };
    default:
      return state;
  }
}
