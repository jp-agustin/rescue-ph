import { SET_RESCUES, SET_SELECTED_RESCUE } from "../types";

const initialState = {
  rescues: [],
  selectedRescue: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESCUES:
      return {
        ...state,
        rescues: action.rescues
      };
    case SET_SELECTED_RESCUE:
      return {
        ...state,
        selectedRescue: action.rescue
      };
    default:
      return state;
  }
};

export default reducer;
