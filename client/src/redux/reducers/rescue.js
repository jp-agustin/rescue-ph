import { SET_RESCUES } from "../types";

const initialState = {
  rescues: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESCUES:
      return {
        ...initialState,
        rescues: action.rescues
      };
    default:
      return state;
  }
};

export default reducer;
