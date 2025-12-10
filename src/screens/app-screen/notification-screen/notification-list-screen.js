import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {SvgUri} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

import {Paragraph} from 'react-native-paper';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {CARD_STYLE} from '../../../assets/styles/imports/cards-styles';
import {NOTIFICATION_STYLE} from '../../../assets/styles/screens/notification-style';
import {HEADER_STYLE} from '../../../components/header/header-style';
import {HOME_STYLE} from '../../../assets/styles/screens/home-style';

// components
import {Card, Loader, NavHeader} from '../../../components/index';

// navigation
import {DrawerActions, useNavigation} from '@react-navigation/native';

// utils
import NOTIFICATIONS from '../../../utils/helper/API/NOTIFICATIONS';
import {formatDateAndTime, formatDate} from '../../../utils/helper/formatDate';
import {getData} from '../../../utils/helper/localStorage';

// redux
import {AuthContext} from '../../../redux/store';

const NotificationListingScreen = props => {
  const navigation = useNavigation();
  const {loginState} = useContext(AuthContext);
  const {t} = useTranslation();

  const [notificationList, setNotificationList] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [icons, setIcons] = useState({});
  const [text, setText] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  // Language from redux
  const lang = loginState.language;

  const fetchData = async () => {
    await NOTIFICATIONS.GET_ALL_NOTIFICATIONS()
      .then(res => {
        // console.log(res.data.data);
        console.log("notification upudated")
        let _data = res.data.data;
        setNotificationList(_data.list);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    let _data = props.route.params;
    setPageTitle(_data.displayName[lang]);

    // Fetch all notifications data
    fetchData();

    // Get settings data from local-storage
    getData('settings')
      .then(res => {
        let _icon = res.commonIcons;
        let _text = res.commonText.update[lang];
        setIcons(_icon);
        setText(_text);
      })
      .catch(error => console.log(error));
  }, [props, lang, loginState.badgeStatus, loginState.notificationUpdate]);

  return (
    <React.Fragment>
      <NavHeader
        title={pageTitle}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
        right={
          <View style={[HOME_STYLE.actionWrap]}>
            <TouchableOpacity
              style={[HEADER_STYLE.btn, {marginHorizontal: 10}]}
              onPress={() => {
                navigation.navigate('notification-update-screen', text);
              }}>
              <SvgUri
                color={COLORS.whiteColor}
                width={28}
                height={28}
                uri={icons.notificationSetting}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[HEADER_STYLE.btn, {marginHorizontal: 10}]}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <SvgUri
                style={{marginHorizontal: 20}}
                color={COLORS.whiteColor}
                width={28}
                height={28}
                uri={icons.menu}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        {!isLoading ? (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
            <View style={[GLOBAL_STYLE.fluidContainer]}>
              <View style={[NOTIFICATION_STYLE.eventCardWrap]}>
                {notificationList.length > 0 ? (
                  notificationList.map((item, index) => {
                    // Function to format date and time
                    // console.log(item.description[lang]);
                    const dateAndTime = formatDate(item.createdOn);
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{paddingHorizontal: 8}}
                        activeOpacity={0.8}
                        onPress={() => {
                          navigation.navigate(
                            'notification-details-screen',
                            item,
                          );
                        }}>
                        <Card
                          iconBtn={
                            <TouchableOpacity
                              style={[HEADER_STYLE.btn, {marginTop: 5}]}
                              onPress={() => {
                                navigation.navigate(
                                  'notification-details-screen',
                                  item,
                                );
                              }}>
                              <SvgUri
                                color={COLORS.primaryColor}
                                width={14}
                                height={14}
                                uri={icons.right}
                              />
                            </TouchableOpacity>
                          }
                          contentStyle={[
                            item.isRead
                              ? CARD_STYLE.notificationCard
                              : CARD_STYLE.notificationCardNew,
                          ]}
                          title={
                            <Text
                              numberOfLines={2}
                              style={[
                                CARD_STYLE.eventTitle,
                                CARD_STYLE.notificationCardContent,
                                {marginLeft: -8},
                              ]}>
                              {item.title[lang]}
                            </Text>
                          }
                          subtitle={
                            <Paragraph
                              style={[
                                CARD_STYLE.eventSubtitle,
                                CARD_STYLE.notificationCardContent,
                                {marginLeft: -8},
                              ]}>
                              {dateAndTime}
                            </Paragraph>
                          }
                          description={
                            <HTMLView
                              value={item.description[lang] ?? ''}
                              stylesheet={{p: {color: COLORS.blackColor}}}
                            />
                          }
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={[CARD_STYLE.noNotificationContainer]}>
                    <Text style={[CARD_STYLE.eventTitle]}>
                      {t('No Notifications.')}
                    </Text>
                  </View>
                )}
              </View>
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

export default NotificationListingScreen;
