import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

export default function configureStore() {
  const store = createStore(reducer(), compose(applyMiddleware(thunk)));

  return store;
}
