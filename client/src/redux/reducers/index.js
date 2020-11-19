import { combineReducers } from 'redux'

import rescue from './rescue';
import socket from './socket';

const reducers = () => combineReducers({
  rescue,
  socket,
});

export default reducers;
