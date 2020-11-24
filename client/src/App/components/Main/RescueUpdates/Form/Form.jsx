import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// import isEmpty from "../../../../../utils/isEmpty";

import { FormContainer, TextArea, DateTimeInput } from "./Form-styles";

const Form = () => {
  const { selectedRescue } = useSelector(state => state.rescue);

  const [textAreaValue, setTextAreaValue] = useState("");
  const [inputValue, setInputValue] = useState("");

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
    setInputValue(today);
  };

  useEffect(() => {
    setCurrentDateTime();
  }, [selectedRescue]);

  return (
    <FormContainer>
      <TextArea
        value={textAreaValue}
        onChange={e => setTextAreaValue(e.target.value)}
      />
      <DateTimeInput
        type="datetime-local"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
    </FormContainer>
  );
};

export default Form;
