import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  ScaleControl,
} from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import has from 'has';

import { getRescues } from '../../../../redux/actions/rescue';

import isEmpty from '../../../../utils/isEmpty';

import CustomMarker from './Marker';

const kilometerZero = [14.5813, 120.9762];

const Map = () => {
  const dispatch = useDispatch();
  const { rescues } = useSelector((state) => state.rescue);

  useEffect(() => {
    dispatch(getRescues());
  }, [])

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

      { !isEmpty(rescues) &&
        rescues.map((rescue) => {
          if (
            has(rescue, 'location')
            && has(rescue.location, 'lat')
            && !isEmpty(rescue.location.lat)
          ) {
            return (
              <CustomMarker
                key={rescue._id}
                rescue={rescue}
              />
            )
          }

          return null;
        })
      }
    </MapContainer>
  );
}

export default Map;
