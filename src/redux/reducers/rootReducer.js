import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Import the reducers here ....

*/

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "contact", "bio", "unread"],
};

// const rootReducer = combineReducers({
//   login: loginReducer,
//   contact: contactReducer,
//   message: messageReducer,
//   text: textReducer,
//   request: requestReducer,
//   unread: unreadReducer,
//   bio: bioReducer,
// });

export default persistReducer(persistConfig, rootReducer);
