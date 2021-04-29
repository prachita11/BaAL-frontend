import { LOGIN, LOGOUT } from "./actionTypes/loginTypes";
export const login = (value) => {
  return {
    type: LOGIN,
    values: {
      name: value.name,
      email: value.email,
      password: value.password,
      api: value.api,
      limit: value.limit,
      plan: value.plan,
      expiryDate: value.expiryDate,
    },
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};
