import React, {useEffect, useState, useContext, useReducer} from 'react';

import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Platform,
  Linking,
  Text,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

import {Paragraph} from 'react-native-paper';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {CARD_STYLE} from '../../../assets/styles/imports/cards-styles';
import {HOME_STYLE} from '../../../assets/styles/screens/home-style';

// components
import {
  Btn,
  ServiceBtn,
  Card,
  MainHeader,
  SnapCarousel,
  AdsBanner,
  Loader,
} from '../../../components/index';

// utils
import SERVICE from '../../../utils/helper/API/SERVICE';
import EVENTS from '../../../utils/helper/API/EVENTS';
import BANNERS from '../../../utils/helper/API/BANNERS';
import {formatDateAndTime} from '../../../utils/helper/formatDate';
import {getData} from '../../../utils/helper/localStorage';

//navigation
import {useNavigation} from '@react-navigation/native';

// redux
import {AuthContext} from '../../../redux/store';

const HomeScreen = props => {
  const navigation = useNavigation();
  const {loginState, dispatch} = useContext(AuthContext);
  const {t} = useTranslation();

  const [serviceList, setServiceList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [allEventsData, setAllEventsData] = useState({title: '', icon: ''});

  const [actionButtons, setActionButtons] = useState({});
  const [bottomTileData, setBottomTileData] = useState({});
  const [icons, setIcons] = useState({});

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // language from redux
  const lang = loginState.language;

  const onRefresh = React.useCallback(() => {
    console.log("refresh start")
    setRefreshing(true);

    getAllServices();
    getAllEvents();
    getAllBanners();
    getSettingData();
  }, []);

  useEffect(() => {
    // Fetching language from AsynStorage & storing it in redux store.
    getData('selected_language')
      .then(res => {
        dispatch({type: 'UPDATE_LANGUAGE', language: res});
      })
      .catch(error => console.log('Failed to set selected language: ', error));
  }, []);

  useEffect(() => {
    try {
      
      getAllServices();

      getAllEvents();

      getAllBanners();

      getSettingData();
      
    } catch (error) {
      console.log('Error while fetching data for HOMESCREEN: ', error);
      setLoading(false);
    }
  }, []);

  // Get all services
  const getAllServices = () => {
    SERVICE.GET_ALL_SERVICES()
    .then(res => {
      let _data = res.data.data;
      setServiceList(_data.services);
    })
    .catch(error =>
      console.log('Error occured while fetching services: ', error),
    );
  }

  // Get all events
  const getAllEvents = () => {
    EVENTS.GET_ALL_EVENTS()
    .then(res => {
      let _data = res.data.data;
      setAllEventsData(allEventsData => ({
        ...allEventsData,
        title: _data.labels.title,
        icon: _data.actionIcons.iconUrl,
      }));
      setEventList(_data.list);
    })
    .catch(error => {
      console.log('Error occured while fetching events data: ', error);
    });
  }

  // get all Banners
  const getAllBanners = () => {
    BANNERS.GET_ALL_BANNERS()
      .then(res => {
        let _data = res.data.data;
        setBannerList(_data.banners);
        setLoading(false);
        setRefreshing(false)

        console.log("refresh false")
      })
      .catch(error =>
        console.log('Error occured while fetching banners data: ', error),
      );
  }

  // Get settings data from local-storage
  const getSettingData = () => {
    getData('settings')
    .then(res => {
      setActionButtons(res.commonText);
      setBottomTileData(res.bottomTile);
      setIcons(res.commonIcons);
    })
    .catch(error =>
      console.log('Error occured while fetching settings data: ', error),
    );
  }



  // Navigate to screen depending on "screenType"
  const navigateToService = (title, type, screenTitle) => {
    console.log(title, type, screenTitle, 'test');
    var serviceData = {
      type: type,
      subCategory: title,
      pageTitle: screenTitle,
    };

    if (type === 'items') {
      console.log('screenType: ', type);
      navigation.navigate('service-listmap-screen', serviceData);
    } else if (type === 'contents') {
      console.log('screenType: ', type);
      navigation.navigate('service-web-screen', serviceData);
    }
  };

  const adsBannerLink = data => {
    return Platform.OS === 'ios'
      ? Linking.openURL(data.ios)
      : Linking.openURL(data.android);
  };

  return (
    <SafeAreaView style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
      <MainHeader
        label={actionButtons?.notification?.[lang]}
        icons={icons}
        statusBg={COLORS.whiteColor}
        barStyle={'dark-content'}
      />
      {loading ? (
        <Loader bgColor={COLORS.tertiaryColor} />
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {onRefresh()}}
              colors={[COLORS.primaryColor]}
            />
          }  
        >
          <View style={[HOME_STYLE.carouselWrap]}>
            <SnapCarousel
              data={bannerList}
              actionButtonLabel={actionButtons?.knowMore?.[lang]}
            />
          </View>
          <View style={[HOME_STYLE.serviceListWrap]}>
            {serviceList.map((item, index) => {
              return (
                <View
                  style={[CARD_STYLE.flatCardWrap, CARD_STYLE.flatCardShadow]}
                  key={index}>
                  <View style={[CARD_STYLE.flatCardHeaderWrap]}>
                    <View style={[GLOBAL_STYLE.titleWrap]}>
                      <View
                        style={[
                          GLOBAL_STYLE.titleIconWrap,
                          HOME_STYLE.titleIconWrap,
                        ]}>
                        <SvgUri
                          style={{marginRight: 10}}
                          width={32}
                          height={32}
                          color={COLORS.secondaryColor}
                          uri={item.iconUrl}
                        />
                        <Text style={[HOME_STYLE.headline]}>
                          {item.title[lang]}
                        </Text>
                      </View>
                      <View style={[GLOBAL_STYLE.titleBtnWrap]}>
                        <Btn
                          onPress={() => {
                            navigation.navigate(item.name, item);
                          }}
                          label={actionButtons.viewAll[lang]}
                          mode="text"
                          size="small"
                          color={COLORS.secondaryColor}
                          contentStyle={{
                            marginRight: -6,
                            marginLeft: -12,
                          }}></Btn>
                      </View>
                    </View>
                  </View>
                  {item.subCategories.length > 0 && (
                    <View style={[CARD_STYLE.flatCardContentWrap]}>
                      <View style={[HOME_STYLE.serviceCategoryListWrap]}>
                        <ScrollView
                          contentInsetAdjustmentBehavior="automatic"
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}>
                          <View style={{width: 20}}></View>
                          {item.subCategories.map((serviceItem, index) => {
                            return (
                              <View
                                style={[HOME_STYLE.serviceBtnWrap]}
                                key={index}>
                                <ServiceBtn
                                  icon={
                                    <SvgUri
                                      style={{
                                        marginLeft: -15,
                                        marginVertical: 10,
                                      }}
                                      width={35}
                                      height={35}
                                      color={COLORS.whiteColor}
                                      uri={serviceItem.iconUrl}
                                    />
                                  }
                                  label={serviceItem.title[lang]}
                                  contentStyle={HOME_STYLE.serviceBtn}
                                  labelStyle={HOME_STYLE.serviceLabelBtn}
                                  color={COLORS.whiteColor}
                                  onPress={() => {
                                    navigateToService(
                                      serviceItem.name,
                                      serviceItem.screenType,
                                      serviceItem.title[lang],
                                    );
                                  }}
                                />
                              </View>
                            );
                          })}
                          <View style={{width: 20}}></View>
                        </ScrollView>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <View style={[GLOBAL_STYLE.container]}>
            {eventList.length > 0 && (
              <React.Fragment>
                <View style={[GLOBAL_STYLE.titleWrap]}>
                  <View style={[GLOBAL_STYLE.titleIconWrap]}>
                    <SvgUri
                      style={{marginRight: 12}}
                      width={26}
                      height={26}
                      color={COLORS.secondaryColor}
                      uri={allEventsData.icon}
                    />
                    <Text style={[HOME_STYLE.headline]}>
                      {allEventsData.title[lang]}
                    </Text>
                  </View>
                  {eventList.length > 0 && (
                    <View style={[GLOBAL_STYLE.titleBtnWrap]}>
                      <Btn
                        onPress={() => {
                          navigation.navigate('events', {
                            eventList,
                          });
                        }}
                        label={actionButtons.viewAll[lang]}
                        mode="text"
                        size="small"
                        color={COLORS.secondaryColor}
                        contentStyle={{marginRight: -6, marginLeft: -12}}></Btn>
                    </View>
                  )}
                </View>
                <View style={[HOME_STYLE.eventCardWrap]}>
                  {eventList.length > 0 ? (
                    eventList.map((item, index) => {
                      const dateAndTime = formatDateAndTime(
                        item.startDate,
                        item.endDate,
                      );

                      return (
                        <Card
                          key={index}
                          contentStyle={[CARD_STYLE.shadowColor]}
                          title={
                            <Text
                              numberOfLines={2}
                              style={[CARD_STYLE.eventTitle]}>
                              {item.title && item.title[lang]}
                            </Text>
                          }
                          subtitle={
                            <Paragraph style={[CARD_STYLE.eventSubtitle]}>
                              {dateAndTime}
                            </Paragraph>
                          }
                          description={
                            <Paragraph
                              numberOfLines={3}
                              style={[CARD_STYLE.description]}>
                              {item.description && item.description[lang]}
                            </Paragraph>
                          }
                          footer={
                            <View
                              style={[
                                CARD_STYLE.btnWrap,
                                CARD_STYLE.eventBtnWrap,
                              ]}>
                              <Btn
                                label={actionButtons.knowMore[lang]}
                                mode="outlined"
                                color={COLORS.secondaryColor}
                                size="small"
                                onPress={() => {
                                  navigation.navigate(
                                    'event-details-screen',
                                    item,
                                  );
                                }}
                                contentStyle={{
                                  marginRight: -6,
                                  marginLeft: -12,
                                }}
                              />
                            </View>
                          }
                        />
                      );
                    })
                  ) : (
                    <View style={[CARD_STYLE.noNotificationContainer]}>
                      <Text style={[HOME_STYLE.headline]}>
                        {t('No Events.')}
                      </Text>
                    </View>
                  )}
                </View>
              </React.Fragment>
            )}
          </View>
        </ScrollView>
      )}

      {bottomTileData.status && loginState.bottomTileStatus && (
        <View
          style={[
            GLOBAL_STYLE.container,
            {paddingVertical: 10, marginBottom: -10},
          ]}>
          <AdsBanner
            title={bottomTileData.heading[lang]}
            description={bottomTileData.subheading[lang]}
            btnText={bottomTileData.download[lang]}
            icon={bottomTileData.icons}
            closeButton={icons.close}
            onPress={() => {
              Platform.OS === 'android'
                ? adsBannerLink(bottomTileData.appUrl)
                : adsBannerLink(bottomTileData.appUrl);
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
