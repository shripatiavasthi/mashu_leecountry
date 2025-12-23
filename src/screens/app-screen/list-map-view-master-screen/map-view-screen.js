import React, {useEffect, useState, useContext} from 'react';
import {Platform, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {SvgUri} from 'react-native-svg';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {LIST_VIEW_CARD_STYLE} from '../../../assets/styles/screens/card-style';
import {MAP_STYLE} from '../../../components/map/map-style';

// components
import {MarkerToolTip} from '../../../components/index';

// redux
import {AuthContext} from '../../../redux/store';

// utils
import getMiles from '../../../utils/helper/getDistanceInMiles';

const MapViewScreen = props => {
  const navigation = useNavigation();
  const {loginState} = useContext(AuthContext);

  const [markerRefs, setMarkerRefs] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  let numberOfMarkers = coordinates.length;
  const [position, setPosition] = useState({
    latitude: 26.614149,
    longitude: -81.825768,
    latitudeDelta: 1.4,
    longitudeDelta: 1.4,
  });

  // Language from redux
  const lang = loginState.language;

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.1421,
          longitudeDelta: 0.1421,
        });
      },
      error => console.log(error, 'geolocation.error'),
    );

    // filtering the array
    const _list = props?.data.filter(item => {
      return item?.address?.lat && item?.address?.lng;
    });
    setCoordinates(_list);
    setMarkerRefs(markerRefs =>
      Array(numberOfMarkers)
        .fill()
        .map((_, i) => markerRefs[i] || React.createRef()),
    );
  }, [numberOfMarkers, props.data]);

  return (
    <View style={LIST_VIEW_CARD_STYLE.tabBodyWrap}>
      <View style={MAP_STYLE.mapViewContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          onMapLoaded={() =>
            Platform.OS === 'android'
              ? markerRefs[0].current.showCallout()
              : console.log('Map Rendered')
          }
          ref={() => markerRefs[0]}
          style={MAP_STYLE.mapView}
          initialRegion={position}
          showsUserLocation={true}>
          {coordinates.map((coordinate, index) => {
            return (
              <Marker
                key={index}
                ref={markerRefs[index]}
                onPress={() => {
                  setTimeout(() => {
                    markerRefs[index].current.hideCallout();
                    markerRefs[index].current.showCallout();
                  }, 20);
                }}
                coordinate={{
                  latitude: coordinate?.address?.lat,
                  longitude: coordinate?.address?.lng,
                }}>
                <SvgUri
                  width={26}
                  height={26}
                  color={COLORS.secondaryColor}
                  uri={props.icons.locationPin}
                />
                <Callout
                  tooltip
                  onPress={() => {
                    let miles = null;
                    if (coordinate?.address?.lat && coordinate?.address?.lng) {
                      const lat = coordinate?.address?.lat;
                      const long = coordinate?.address?.lng;
                      console.log(lat, long);

                      // Function to get distance in miles
                      miles = getMiles(lat, long, position);
                    }
                    console.log(miles);
                    navigation.navigate('service-map-details-screen', {
                      title: coordinate.title[lang],
                      coverImage: coordinate.backgroundImageUrl,
                      address: coordinate.address.address[lang],
                      description: coordinate.description[lang],
                      call: coordinate.phoneNumber,
                      pageTitle: props.pageTitle,
                      buttonLabel: props.buttonLabel,
                      miles: miles,
                    });
                  }}>
                  <MarkerToolTip
                    title={coordinate.title[lang]}
                    address={coordinate?.address?.address?.[lang]}
                    coverImage={coordinate?.backgroundImageUrl}
                  />
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    </View>
  );
};

export default MapViewScreen;
