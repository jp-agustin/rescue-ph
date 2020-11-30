import axios from "axios";

import isEmpty from "../../utils/isEmpty";

import { SET_UPDATES } from "../types";

export const setUpdates = updates => ({
  type: SET_UPDATES,
  updates
});

export const getUpdates = id => dispatch => {
  const apiUrl = `/api/rescues/${id}/updates`;

  axios
    .get(apiUrl)
    .then(res => {
      const updates = res.data;

      if (!isEmpty(updates)) {
        dispatch(setUpdates(updates));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const addUpdate = (id, body) => dispatch => {
  const apiUrl = `/api/rescues/${id}/updates`;

  axios
    .post(apiUrl, body)
    .then(res => {
      const updates = res.data;

      if (!isEmpty(updates)) {
        dispatch(setUpdates(updates));
      }
    })
    .catch(err => {
      console.log(err);
    });
};
