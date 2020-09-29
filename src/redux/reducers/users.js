import {
  RECEIVE_USERS,
  USER_ANSWER_QUESTION,
  ADD_USER_QUESTION
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case USER_ANSWER_QUESTION:
      return {
        ...state,
        [action.auth.userId]: {
          ...state[action.auth.userId],
          answers: {
            ...state[action.auth.userId].answers,
            [action.qid]: action.option
          }
        }
      };
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser.userId].questions.concat([
            action.qid
          ])
        }
      };
    default:
      return state;
  }
}
