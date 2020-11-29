import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setRescues } from "../../../redux/actions/rescue";

import isEmpty from "../../../utils/isEmpty";

import { MainContainer } from "./Main-styles";

import Map from "./Map";
import RescueUpdates from "./RescueUpdates";

const Main = () => {
  const dispatch = useDispatch();

  const { socket } = useSelector(state => state.socket);
  const { rescues, selectedRescue } = useSelector(state => state.rescue);

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.on("new-rescue", newRescue => {
        dispatch(setRescues([...rescues, newRescue]));
      });
    }
  }, [socket, rescues]);

  return (
    <MainContainer>
      <Map />

      {!isEmpty(selectedRescue) && <RescueUpdates />}
    </MainContainer>
  );
};

export default Main;
