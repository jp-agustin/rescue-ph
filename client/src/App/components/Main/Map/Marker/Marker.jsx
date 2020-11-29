import React from "react";
import { useDispatch } from "react-redux";
import { Marker } from "react-leaflet";

import { setSelectedRescue } from "../../../../../redux/actions/rescue";
import { setUpdates, getUpdates } from "../../../../../redux/actions/update";

import { CustomPopup, Accent } from "./Marker-styles";

const CustomMarker = ({ rescue, setView }) => {
  const dispatch = useDispatch();

  const selectMarker = e => {
    setView(e);
    dispatch(setUpdates([]));
    dispatch(getUpdates(rescue._id));
    dispatch(setSelectedRescue(rescue._id));
  };

  return (
    <Marker
      position={[rescue.location.lat, rescue.location.lon]}
      eventHandlers={{
        click: selectMarker
      }}
    >
      <CustomPopup autoPan={false}>
        <Accent>Contact Person:</Accent>
        {` ${rescue.contactPerson} `}
        <br />
        <Accent>Contact Number:</Accent>
        {` ${rescue.contactNumber} `}
        <br />
        <Accent>No. of Person:</Accent>
        {` ${rescue.noOfPerson} `}
        <br />
        <Accent>Additional Info:</Accent>
        {` ${rescue.additionalInfo} `}
      </CustomPopup>
    </Marker>
  );
};

export default CustomMarker;
