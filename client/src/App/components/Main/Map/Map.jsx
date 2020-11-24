import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  ScaleControl
} from "react-leaflet";
import { latLng } from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import has from "has";

import { getRescues } from "../../../../redux/actions/rescue";

import isEmpty from "../../../../utils/isEmpty";

import CustomMarker from "./Marker";

const kilometerZero = [14.5813, 120.9762];

const Map = () => {
  const dispatch = useDispatch();
  const { rescues } = useSelector(state => state.rescue);

  const [map, setMap] = useState("");

  const setView = e => {
    map.setView(latLng(e.latlng), map.getZoom());
  };

  useEffect(() => {
    dispatch(getRescues());
  }, []);

  return (
    <MapContainer
      center={kilometerZero}
      zoom={10}
      scrollWheelZoom
      zoomControl={false}
      whenCreated={m => {
        setMap(m);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ScaleControl position="bottomright" />
      <ZoomControl position="bottomright" />

      {!isEmpty(rescues) &&
        rescues.map(rescue => {
          if (
            has(rescue, "location") &&
            !isEmpty(rescue.location.lat) &&
            !isEmpty(rescue.location.lon)
          ) {
            return (
              <CustomMarker
                key={rescue._id}
                rescue={rescue}
                setView={setView}
              />
            );
          }

          return null;
        })}
    </MapContainer>
  );
};

export default Map;
