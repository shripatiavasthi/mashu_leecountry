import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Image, ScrollView} from 'react-native';

// styles
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {COLORS} from '../../../assets/styles/imports/variables';
import {LIST_VIEW_CARD_STYLE} from '../../../assets/styles/screens/card-style';

//components
import CoverCard from '../../../components/cards/cover-card';
import {NavHeader} from '../../../components';

const ServiceMapDetailsScreen = props => {
  const _data = props.route.params;
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    setPageTitle(_data.pageTitle);
  }, [props]);

  return (
    <React.Fragment>
      <NavHeader
        title={pageTitle}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={LIST_VIEW_CARD_STYLE.detailsCardBodyWrap}>
            <CoverCard
              title={_data.title}
              address={_data.address}
              coverImage={_data.coverImage}
              call={_data.call}
              description={_data.description}
              buttonLabel={_data.buttonLabel}
              miles={_data.miles}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ServiceMapDetailsScreen;
