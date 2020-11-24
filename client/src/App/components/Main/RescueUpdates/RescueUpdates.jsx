import React from "react";

import { RescueUpdatesContainer } from "./RescueUpdates-styles";

import UpdatesList from "./UpdatesList";
import Form from "./Form";

const RescueUpdates = () => (
  <RescueUpdatesContainer>
    <UpdatesList />
    <Form />
  </RescueUpdatesContainer>
);

export default RescueUpdates;
