import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, convertDistance} from 'geolib';

const getMiles = (lat, long, position) => {
  console.log(position, 'props.position');
  if (position.latitude != 26.614149 && position.longitude != -81.825768) {
    // Get distance between user's location and destination coordinates
    const dis = getDistance(
      {latitude: position.latitude, longitude: position.longitude},
      {latitude: lat, longitude: long},
    );
    const miles = convertDistance(dis, 'mi');
    return parseInt(miles);
  } else {
    return null;
  }
};

export default getMiles;
