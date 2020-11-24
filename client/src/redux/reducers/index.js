import { combineReducers } from "redux";

import rescue from "./rescue";
import update from "./update";

const reducers = () =>
  combineReducers({
    rescue,
    update
  });

export default reducers;
