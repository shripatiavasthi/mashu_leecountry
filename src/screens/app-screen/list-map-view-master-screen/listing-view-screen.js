import React, {useEffect, useState, useContext} from 'react';
import {View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, convertDistance} from 'geolib';

// styles
import {LIST_VIEW_CARD_STYLE} from '../../../assets/styles/screens/card-style';

// utils
import getMiles from '../../../utils/helper/getDistanceInMiles';

// components
import CoverCard from '../../../components/cards/cover-card';
import {Loader} from '../../../components';

// redux
import {AuthContext} from '../../../redux/store';

const ListingViewScreen = props => {
  const [serviceList, setServiceList] = useState([]);
  const {loginState, dispatch} = useContext(AuthContext);
  // Language from redux
  const lang = loginState.language;
  const [position, setPosition] = useState({
    latitude: 26.614149,
    longitude: -81.825768,
  });
  const isDataLoading = () => {
    props.onChange(true);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        console.log('Geolocation.getCurrentPosition', pos);
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
        });
      },
      error => console.log(error, 'geolocation.error'),
    );
    setServiceList(props.data);
    props.data.length > 0 && isDataLoading();
  }, [props]);

  return (
    <React.Fragment>
      <View style={LIST_VIEW_CARD_STYLE.listingView}>
        {serviceList.length > 0 ? (
          serviceList.map((item, index) => {
            let miles = null;
            if (item?.address?.lat && item?.address?.lng) {
              const lat = item.address?.lat;
              const long = item.address?.lng;
              console.log(lat, long);

              // Function to get distance in miles
              miles = getMiles(lat, long, position);
              console.log(miles);
            }
            return (
              <React.Fragment key={index}>
                <CoverCard
                  title={item?.title[lang]}
                  description={item?.description && item?.description[lang]}
                  coverImage={
                    item?.backgroundImageUrl && item?.backgroundImageUrl
                  }
                  call={item.phoneNumber && item.phoneNumber}
                  address={item?.address?.address[lang]}
                  buttonLabel={props.buttonLabel}
                  miles={miles != null && miles}
                />
              </React.Fragment>
            );
          })
        ) : (
          <Loader bgColor={'transparent'} />
        )}
      </View>
    </React.Fragment>
  );
};

export default ListingViewScreen;
