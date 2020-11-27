import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addUpdate } from "../../../../../redux/actions/update";

import isEmpty from "../../../../../utils/isEmpty";

import {
  FormContainer,
  TextArea,
  Row,
  DateTimeInput,
  Button
} from "./Form-styles";

const Form = () => {
  const dispatch = useDispatch();
  const { selectedRescue } = useSelector(state => state.rescue);

  const [update, setUpdate] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [isValidTimestamp, setIsValidTimestamp] = useState(true);
  const [isValidUpdate, setIsValidUpdate] = useState(true);

  const setCurrentDateTime = () => {
    const dt = new Date();

    let day = dt.getDate();
    let month = dt.getMonth() + 1;
    const year = dt.getFullYear();

    let hours = dt.getHours();
    let minutes = dt.getMinutes();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    const today = `${year}-${month}-${day}T${hours}:${minutes}`;
    setTimestamp(today);
  };

  const reset = () => {
    setCurrentDateTime();
    setUpdate("");
    setIsValidUpdate(true);
    setIsValidTimestamp(true);
  };

  const submitForm = () => {
    setIsValidTimestamp(true);
    setIsValidUpdate(true);

    if (!isEmpty(update) && !isEmpty(timestamp)) {
      dispatch(
        addUpdate(selectedRescue, {
          timestamp: new Date(timestamp),
          update
        })
      );

      reset();
    } else {
      if (isEmpty(update)) {
        setIsValidUpdate(false);
      }

      if (isEmpty(timestamp)) {
        setIsValidTimestamp(false);
      }
    }
  };

  useEffect(() => {
    reset();
  }, [selectedRescue]);

  return (
    <FormContainer>
      <TextArea
        value={update}
        onChange={e => setUpdate(e.target.value)}
        error={!isValidUpdate}
        placeholder="Please enter an update..."
      />

      <Row>
        <DateTimeInput
          type="datetime-local"
          value={timestamp}
          onChange={e => setTimestamp(e.target.value)}
          error={!isValidTimestamp}
        />

        <Button onClick={submitForm}>Add Update</Button>
      </Row>
    </FormContainer>
  );
};

export default Form;
