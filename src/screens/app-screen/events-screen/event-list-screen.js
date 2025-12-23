import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {Paragraph} from 'react-native-paper';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {CARD_STYLE} from '../../../assets/styles/imports/cards-styles';
import {HOME_STYLE} from '../../../assets/styles/screens/home-style';
import {HEADER_STYLE} from '../../../components/header/header-style';

// components
import {Btn, Card, Loader, NavHeader} from '../../../components/index';

// utils
import EVENTS from '../../../utils/helper/API/EVENTS';
import {formatDateAndTime} from '../../../utils/helper/formatDate';
import {getData} from '../../../utils/helper/localStorage';

// navigation
import {DrawerActions, useNavigation} from '@react-navigation/native';

// redux
import {AuthContext} from '../../../redux/store';

const EventListingScreen = props => {
  const navigation = useNavigation();
  const {loginState} = useContext(AuthContext);
  const {t} = useTranslation();

  const [eventList, setEventList] = useState([]);
  const [actionButton, setActionButton] = useState({});
  const [pageTitle, setPageTitle] = useState('');
  const [icon, setIcon] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  // Language from redux
  const lang = loginState.language;

  useEffect(() => {
    setIsLoading(true);
    let _data = props.route.params;
    if (_data?.eventList) {
      setEventList(_data?.eventList);
      setIsLoading(false);
    } else {
      EVENTS.GET_ALL_EVENTS()
        .then(res => {
          let data = res.data.data;
          setEventList(data?.list);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    }

    setPageTitle(_data.displayName[lang]);

    getData('settings').then(res => {
      let _data = res.commonText;
      let _icon = res.commonIcons;
      setActionButton(_data);
      setIcon(_icon);
    });
  }, [props, lang]);

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
              style={{
                marginHorizontal: 20,
              }}
              width={28}
              height={28}
              color={COLORS.whiteColor}
              uri={icon.menu}
            />
          </TouchableOpacity>
        }
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        {!isLoading ? (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
            <View style={[GLOBAL_STYLE.container]}>
              {eventList.length > 0 ? (
                <React.Fragment>
                  <View style={[HOME_STYLE.eventCardWrap]}>
                    {eventList.map((item, index) => {
                      const dateAndTime = formatDateAndTime(
                        item.startDate,
                        item.endDate,
                      );
                      return (
                        <Card
                          key={index}
                          contentStyle={[CARD_STYLE.shadowColor]}
                          iconBtn={
                            <TouchableOpacity
                              style={[HEADER_STYLE.btn, {marginTop: 5}]}
                              onPress={() => {
                                navigation.navigate(
                                  'event-details-screen',
                                  item,
                                );
                              }}>
                              <SvgUri
                                color={COLORS.primaryColor}
                                width={14}
                                height={14}
                                uri={icon.right}
                              />
                            </TouchableOpacity>
                          }
                          title={
                            <Text
                              numberOfLines={2}
                              style={[
                                CARD_STYLE.eventTitle,
                                {paddingRight: 50},
                              ]}>
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
                                label={actionButton?.knowMore?.[lang]}
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
                    })}
                  </View>
                </React.Fragment>
              ) : (
                <View style={[CARD_STYLE.noNotificationContainer]}>
                  <Text style={[CARD_STYLE.eventTitle]}>{t('No Events.')}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={[CARD_STYLE.loaderWrap]}>
            <Loader bgColor={COLORS.greyColor} />
          </View>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default EventListingScreen;
