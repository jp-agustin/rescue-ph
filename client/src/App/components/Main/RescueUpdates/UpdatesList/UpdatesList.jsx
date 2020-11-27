import React from "react";
import { useSelector } from "react-redux";

import isEmpty from "../../../../../utils/isEmpty";

import {
  UpdatesContainer,
  UpdateContainer,
  UpdateText,
  Timestamp
} from "./UpdatesList-styles";

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "Asia/Manila"
};

const UpdatesList = () => {
  const { updates } = useSelector(state => state.update);

  return (
    <UpdatesContainer>
      {!isEmpty(updates) &&
        [...updates].reverse().map(update => (
          <UpdateContainer key={update._id}>
            <UpdateText>{update.update}</UpdateText>
            <Timestamp>
              {`${new Date(update.timestamp).toLocaleDateString(
                undefined,
                options
              )} ${new Date(update.timestamp).toLocaleTimeString("en-US", {
                timeZone: "Asia/Manila"
              })}`}
            </Timestamp>
          </UpdateContainer>
        ))}
    </UpdatesContainer>
  );
};

export default UpdatesList;
