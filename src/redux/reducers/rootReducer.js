import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginReducer from "./loginReducer";
import authenticationReducer from "./authenticationReducer";
import transactionReducer from "./transactionReducer";
import planReducer from "./selectedPlanReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "auth", "plan"],
};

const rootReducer = combineReducers({
  login: loginReducer,
  auth: authenticationReducer,
  transaction: transactionReducer,
  plan: planReducer,
});

export default persistReducer(persistConfig, rootReducer);
