import {
  SET_PLAN,
  REMOVE_PLAN,
} from "../actions/actionTypes/selectedPlanTypes";
const initialState = {
  plan: "",
  price: "",
  limit: 0,
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAN:
      return {
        ...state,
        plan: action.values.plan,
        price: action.values.price,
        limit: action.values.limit,
      };
    case REMOVE_PLAN:
      return initialState;
    default:
      return state;
  }
};
export default planReducer;
