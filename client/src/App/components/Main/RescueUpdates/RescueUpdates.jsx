import React from "react";
import { X } from "react-feather";
import { useDispatch } from "react-redux";

import { setSelectedRescue } from "../../../../redux/actions/rescue";

import {
  RescueUpdatesContainer,
  TitleContainer,
  Title,
  CloseIconContainer
} from "./RescueUpdates-styles";

import UpdatesList from "./UpdatesList";
import Form from "./Form";

const RescueUpdates = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSelectedRescue(""));
  };

  return (
    <RescueUpdatesContainer>
      <TitleContainer>
        <Title>Rescue Updates</Title>
        <CloseIconContainer>
          <X size="1rem" onClick={handleClose} />
        </CloseIconContainer>
      </TitleContainer>
      <UpdatesList />
      <Form />
    </RescueUpdatesContainer>
  );
};

export default RescueUpdates;
