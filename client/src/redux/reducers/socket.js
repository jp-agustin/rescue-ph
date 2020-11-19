import {
  SET_SOCKET,
} from '../types';

const initialState = {
  socket: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...initialState,
        socket: action.socket,
      }
    default:
      return state;
  }
}

export default reducer;
