import axios from "axios";

import isEmpty from "../../utils/isEmpty";

import { GET_RESCUES } from "../types";

export const setRescues = rescues => ({
  type: GET_RESCUES,
  rescues
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
