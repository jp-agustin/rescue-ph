import React from 'react';
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';

const Map = () => {

  return (
    <MapContainer center={[14.5813, 120.9762]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
