import React, {useEffect, useState, useContext} from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Paragraph} from 'react-native-paper';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {CARD_STYLE} from '../../../assets/styles/imports/cards-styles';
import {HOME_STYLE} from '../../../assets/styles/screens/home-style';

// components
import {Card, NavHeader} from '../../../components/index';

// utils
import {formatDateAndTime} from '../../../utils/helper/formatDate';

// redux
import {AuthContext} from '../../../redux/store';

const EventDetails = props => {
  const {loginState} = useContext(AuthContext);
  const {t} = useTranslation();
  const [eventList, setEventList] = useState(props.route.params);

  // Language from redux
  const lang = loginState.language;

  useEffect(() => {}, []);

  // Function to format date anf time
  const dateAndTime = formatDateAndTime(eventList.startDate, eventList.endDate);

  return (
    <React.Fragment>
      <NavHeader
        title={t('Event Details')}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={[GLOBAL_STYLE.container]}>
            <View style={[HOME_STYLE.eventCardWrap]}>
              <Card
                contentStyle={[CARD_STYLE.shadowColor]}
                title={
                  <Text style={[CARD_STYLE.eventTitle]}>
                    {eventList.title && eventList.title[lang]}
                  </Text>
                }
                subtitle={
                  <Paragraph style={[CARD_STYLE.eventSubtitle]}>
                    {dateAndTime}
                  </Paragraph>
                }
                description={
                  <Paragraph style={[CARD_STYLE.description]}>
                    {eventList.description && eventList.description[lang]}
                  </Paragraph>
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default EventDetails;
