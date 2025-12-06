import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {useTranslation} from 'react-i18next';

import {Paragraph} from 'react-native-paper';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {CARD_STYLE} from '../../../assets/styles/imports/cards-styles';
import {HOME_STYLE} from '../../../assets/styles/screens/home-style';

// components
import {Card, NavHeader, Loader} from '../../../components/index';

// utils
import NOTIFICATIONS from '../../../utils/helper/API/NOTIFICATIONS';
import {formatDateAndTime, formatDate} from '../../../utils/helper/formatDate';

// redux
import {AuthContext} from '../../../redux/store';

const NotificationDetailsScreen = props => {
  const {t} = useTranslation();
  const {loginState} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [notification, setNotification] = useState({});

  // Language from redux
  const lang = loginState.language;

  const fetchData = async (id) => {
    await NOTIFICATIONS.GET_NOTIFICATIONS_DETAILS(id)
      .then(res => {
        console.log(res.data.data, "GET_NOTIFICATIONS_DETAILS");
        let _data = res.data.data;
        setNotification(_data);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    
    

    console.log(props.route.params, "props.route.params test")
    if(props.route.params.isRedirectFrom == "notification-invoked") {
      console.log("api call for details")
      setIsLoading(true);
      fetchData(props.route.params.data.data.id)
    } else {
      console.log("no api call for details")
      const _data = props.route.params;
      setNotification(_data);
    }
  }, [props.route.params]);



  return (
    <React.Fragment>
      <NavHeader
        title={t('Notification Details')}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>

        {
          isLoading ? (
            <View style={[CARD_STYLE.loaderWrap]}>
              <Loader bgColor={COLORS.greyColor} />
            </View>
          ) : (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}>
              <View style={[GLOBAL_STYLE.container]}>
                <React.Fragment>
                  <View style={[HOME_STYLE.eventCardWrap]}>
                    <Card
                      contentStyle={[CARD_STYLE.shadowColor]}
                      title={
                        <Text style={[CARD_STYLE.eventTitle]}>
                          {notification?.title?.[lang]}
                        </Text>
                      }
                      subtitle={
                        <Paragraph style={[CARD_STYLE.eventSubtitle]}>
                          {formatDate(notification.createdOn)}
                        </Paragraph>
                      }
                      description={
                        <HTMLView
                          value={notification?.description?.[lang] ?? ''}
                          stylesheet={{p: {color: COLORS.blackColor}}}
                        />
                      }
                    />
                  </View>
                </React.Fragment>
              </View>
            </ScrollView>
          )
        }
        

        
      </SafeAreaView>
    </React.Fragment>
  );
};

export default NotificationDetailsScreen;
