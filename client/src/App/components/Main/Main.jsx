import React from "react";
import { useSelector } from "react-redux";

import isEmpty from "../../../utils/isEmpty";

import { MainContainer } from "./Main-styles";

import Map from "./Map";
import RescueUpdates from "./RescueUpdates";

const Main = () => {
  const { selectedRescue } = useSelector(state => state.rescue);

  return (
    <MainContainer>
      <Map />

      {!isEmpty(selectedRescue) && <RescueUpdates />}
    </MainContainer>
  );
};

export default Main;
