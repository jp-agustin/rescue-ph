import React from 'react';
import { Marker } from 'react-leaflet';

import {
  CustomPopup,
  Accent,
} from './Marker-styles';

const CustomMarker = (props) => {

  return (
    <Marker
      position={[props.rescue.location.lat, props.rescue.location.lon]}
    >
      <CustomPopup>
        <Accent>Contact Person:</Accent> {props.rescue.contactPerson} <br />
        <Accent>Contact Number:</Accent> {props.rescue.contactNumber} <br />
        <Accent>No. of Person:</Accent> {props.rescue.noOfPerson} <br />
        <Accent>Additional Info:</Accent> {props.rescue.additionalInfo}
      </CustomPopup>
    </Marker>
  );
}

export default CustomMarker;
