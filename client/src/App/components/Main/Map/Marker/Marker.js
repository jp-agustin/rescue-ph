import React from 'react';
import { Marker } from 'react-leaflet';

import {
  CustomPopup,
  Accent,
} from './Marker-styles';

const CustomMarker = ({ rescue }) => {

  return (
    <Marker
      position={[rescue.location.lat, rescue.location.lon]}
    >
      <CustomPopup>
        <Accent>Contact Person:</Accent> {rescue.contactPerson} <br />
        <Accent>Contact Number:</Accent> {rescue.contactNumber} <br />
        <Accent>No. of Person:</Accent> {rescue.noOfPerson} <br />
        <Accent>Additional Info:</Accent> {rescue.additionalInfo}
      </CustomPopup>
    </Marker>
  );
}

export default CustomMarker;
