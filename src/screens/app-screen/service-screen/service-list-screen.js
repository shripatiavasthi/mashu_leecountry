import React, {useEffect, useState, useContext} from 'react';
import {View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {SvgUri} from 'react-native-svg';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {LISTING_STYLE} from '../../../components/listing/listing-style';
import {HEADER_STYLE} from '../../../components/header/header-style';

// images
import {GLOBAL_ICON, GLOBAL_IMAGES} from '../../../assets/images/global-images';

// components
import {ServiceListing, NavHeader} from '../../../components/index';

// navigation
import {DrawerActions, useNavigation} from '@react-navigation/native';

// utils
import {getData} from '../../../utils/helper/localStorage';
import SERVICE from '../../../utils/helper/API/SERVICE';

// redux
import {AuthContext} from '../../../redux/store';

const ServiceListScreen = props => {
  let _data = props.route.params;
  const {loginState} = useContext(AuthContext);
  const navigation = useNavigation();

  const [serviceList, setServiceList] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [icons, setIcons] = useState({});

  // Language from redux
  const lang = loginState.language;

  useEffect(() => {
    let _data = props.route.params;
    if (_data?.subCategories) {
      setPageTitle(_data.displayName[lang]);
      setServiceList(_data?.subCategories);
    } else {
      setPageTitle(_data.displayName[lang]);

      let serviceName = _data.name;
      let subCategoryName = _data.screenType;
      SERVICE.GET_SERVICE(subCategoryName, serviceName)
        .then(res => {
          let tempArr = res.data?.data?.services;
          const newArr = tempArr.filter(item => item !== null);
          setServiceList(newArr);
        })
        .catch(error => console.log(error));
    }

    getData('settings')
      .then(res => {
        setIcons(res.commonIcons);
      })
      .catch(error => console.log(error));
  }, [props, lang]);

  // Navigate to screen depending on "screenType"
  const navigateToService = (title, type, screenTitle) => {
    var serviceData = {
      type: type,
      subCategory: title,
      pageTitle: screenTitle,
    };

    if (type === 'items') {
      // console.log('map', type);
      navigation.navigate('service-listmap-screen', serviceData);
    } else if (type === 'contents') {
      // console.log('web', type);
      navigation.navigate('service-web-screen', serviceData);
    }
  };

  return (
    <React.Fragment>
      <NavHeader
        title={pageTitle}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
        right={
          <TouchableOpacity
            style={[HEADER_STYLE.btn, {marginHorizontal: 20}]}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <SvgUri
              width={26}
              height={26}
              color={COLORS.whiteColor}
              uri={icons.menu}
            />
          </TouchableOpacity>
        }
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={[GLOBAL_STYLE.container, {paddingVertical: 24}]}>
            {serviceList.map((item, index) => {
              return (
                <View key={index} style={{flex: 1}}>
                  <ServiceListing
                    icon={
                      <SvgUri
                        style={{marginHorizontal: 14}}
                        width={28}
                        height={28}
                        color={COLORS.whiteColor}
                        uri={item.iconUrl}
                      />
                    }
                    label={item.title[lang]}
                    contentStyle={LISTING_STYLE.serviceListItem}
                    labelStyle={LISTING_STYLE.serviceListLabel}
                    color={COLORS.whiteColor}
                    onPress={() => {
                      navigateToService(
                        item.name,
                        item.screenType,
                        item.title[lang],
                      );
                    }}
                    iconArrow={
                      <SvgUri
                        style={{marginHorizontal: 16}}
                        width={10}
                        height={14}
                        color={COLORS.whiteColor}
                        uri={icons.right}
                      />
                    }
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ServiceListScreen;
