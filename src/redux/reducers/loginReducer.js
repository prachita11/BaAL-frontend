import { LOGIN, LOGOUT } from "../actions/actionTypes/loginTypes";
const initialState = {
  name: "",
  email: "",
  password: "",
  api: "",
  limit: "",
  plan: "",
  expiryDate: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        name: action.values.name,
        email: action.values.email,
        password: action.values.password,
        api: action.values.api,
        limit: action.values.limit,
        plan: action.values.plan,
        expiryDate: action.values.expiryDate,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default loginReducer;
