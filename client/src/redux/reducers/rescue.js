import {
  GET_RESCUES,
} from '../types';

const initialState = {
  rescues: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESCUES:
      return {
        ...initialState,
        rescues: action.rescues,
      }
    default:
      return state;
  }
}

export default reducer;
