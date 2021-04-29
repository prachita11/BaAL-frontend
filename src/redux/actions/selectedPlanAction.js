import { SET_PLAN, REMOVE_PLAN } from "./actionTypes/selectedPlanTypes";

export const setPlan = (value) => {
  return {
    type: SET_PLAN,
    values: value,
  };
};
export const removePlan = (value) => {
  return {
    type: REMOVE_PLAN,
  };
};
