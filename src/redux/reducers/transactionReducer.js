import {
  SHOW_TRANSACTION,
  REMOVE_TRANSACTION,
} from "../actions/actionTypes/transactionTypes";
const initialState = [];

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TRANSACTION:
      let transaction = [];
      action.values.forEach((element) => {
        transaction.push({
          request: element.request,
          response: element.response,
          executionDate: element.executionDate,
        });
      });

      return transaction;

    case REMOVE_TRANSACTION:
      return initialState;
    default:
      return state;
  }
};
export default transactionReducer;
