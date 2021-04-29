import {
  SHOW_TRANSACTION,
  REMOVE_TRANSACTION,
} from "./actionTypes/transactionTypes";

export const setTransaction = (value) => {
  console.log(value);
  return {
    type: SHOW_TRANSACTION,
    values: value,
  };
};

export const removeTransaction = () => {
  return {
    type: REMOVE_TRANSACTION,
  };
};
