import {
  SET_TOKEN,
  REMOVE_TOKEN,
} from "../actions/actionTypes/authenticationTypes";
const auth = "";

const authenticationReducer = (state = auth, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.values;

    case REMOVE_TOKEN:
      return auth;
    default:
      return state;
  }
};
export default authenticationReducer;
