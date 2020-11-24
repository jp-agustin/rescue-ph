import { SET_UPDATES } from "../types";

const initialState = {
  updates: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATES:
      return {
        ...state,
        updates: action.updates
      };
    default:
      return state;
  }
};

export default reducer;
