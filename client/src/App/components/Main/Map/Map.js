import React from 'react';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  ScaleControl,
} from 'react-leaflet';

const kilometerZero = [14.5813, 120.9762];

const Map = () => {

  return (
    <MapContainer
      center={kilometerZero}
      zoom={10}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ScaleControl position='bottomright' />
      <ZoomControl position='bottomright' />
    </MapContainer>
  );
}

export default Map;
