import { SET_STATE } from "./actionTypes/StateType";

export const setState = (value) => {
  return {
    type: SET_BIO,
    values: value
  };
};
