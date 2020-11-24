import axios from "axios";

import isEmpty from "../../utils/isEmpty";

import { SET_RESCUES, SET_SELECTED_RESCUE } from "../types";

export const setRescues = rescues => ({
  type: SET_RESCUES,
  rescues
});

export const setSelectedRescue = rescue => ({
  type: SET_SELECTED_RESCUE,
  rescue
});

export const getRescues = () => dispatch => {
  const apiUrl = "/api/rescues";

  axios
    .get(apiUrl)
    .then(res => {
      const rescues = res.data;

      if (!isEmpty(rescues)) {
        dispatch(setRescues(rescues));
      }
    })
    .catch(err => {
      console.log(err);
    });
};
