import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addUpdate } from "../../../../../redux/actions/update";

import isEmpty from "../../../../../utils/isEmpty";

import { FormContainer, TextArea, Button } from "./Form-styles";

const Form = () => {
  const dispatch = useDispatch();
  const { selectedRescue } = useSelector(state => state.rescue);

  const [update, setUpdate] = useState("");
  const [isValidUpdate, setIsValidUpdate] = useState(true);

  const reset = () => {
    setUpdate("");
    setIsValidUpdate(true);
  };

  const submitForm = () => {
    setIsValidUpdate(true);

    if (!isEmpty(update)) {
      dispatch(addUpdate(selectedRescue, { update }));
      reset();
    } else {
      setIsValidUpdate(false);
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

      <Button onClick={submitForm}>Add Update</Button>
    </FormContainer>
  );
};

export default Form;
