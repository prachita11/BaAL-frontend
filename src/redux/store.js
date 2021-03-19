import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";

const store = createStore(
  rootReducer,
  composeWithDevTools()
  // other store enhancers if any
);
const persistor = persistStore(store);
export { store, persistor };