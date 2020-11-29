import { combineReducers } from "redux";

import rescue from "./rescue";
import socket from "./socket";
import update from "./update";

const reducers = () =>
  combineReducers({
    rescue,
    socket,
    update
  });

export default reducers;
