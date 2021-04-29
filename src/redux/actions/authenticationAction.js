import { SET_TOKEN, REMOVE_TOKEN } from "./actionTypes/authenticationTypes";
export const setToken = (value) => {
  return {
    type: SET_TOKEN,
    values: value,
  };
};

export const removeToken = () => {
  return {
    type: REMOVE_TOKEN,
  };
};
