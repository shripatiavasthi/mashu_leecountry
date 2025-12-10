import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {LIST_VIEW_CARD_STYLE} from '../../../assets/styles/screens/card-style';

// components
import {NavHeader} from '../../../components/index';

// screen components
import ListingViewScreen from '../list-map-view-master-screen/listing-view-screen';
import MapViewScreen from '../list-map-view-master-screen/map-view-screen';

// utils
import SERVICE from '../../../utils/helper/API/SERVICE';
import {getData} from '../../../utils/helper/localStorage';

// redux
import {AuthContext} from '../../../redux/store';

const ServiceListMapScreen = props => {
  const {loginState, dispatch} = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState('list-view');

  const [pageTitle, setPageTitle] = useState('');
  const [serviceList, setServiceList] = useState('');
  const [buttonLabel, setButtonLabel] = useState({});
  const [icons, setIcons] = useState({});

  const [buttonStatus, setButtonStatus] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  // Language from redux
  const lang = loginState.language;

  const changeTabs = tab => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    let _data = props.route.params;

    // Set page title
    setPageTitle(_data.pageTitle);
    let type = _data.type;
    let subCategory = _data.subCategory;

    // Get subcategory data
    SERVICE.GET_SERVICE(type, subCategory)
      .then(res => {
        let data = res?.data?.data;
        setServiceList(data.list);
      })
      .catch(error => console.log(error));

    getData('settings')
      .then(res => {
        setIcons(res.commonIcons);
        setButtonLabel(res?.commonText);
      })
      .catch(error => console.log(error));
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
        <View style={LIST_VIEW_CARD_STYLE.tabBtnHeader}>
          {isButtonLoading && (
            <View style={LIST_VIEW_CARD_STYLE.tabBtnHeaderWrap}>
              <TouchableOpacity
                style={[
                  LIST_VIEW_CARD_STYLE.tabBtn,
                  currentTab === 'list-view' &&
                    LIST_VIEW_CARD_STYLE.tabBtnActive,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  changeTabs('list-view');
                }}>
                <Text
                  style={[
                    LIST_VIEW_CARD_STYLE.tabBtnLabel,
                    currentTab === 'list-view' &&
                      LIST_VIEW_CARD_STYLE.tabBtnLabelActive,
                  ]}>
                  {buttonLabel?.listView?.[lang]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  LIST_VIEW_CARD_STYLE.tabBtn,
                  currentTab === 'map-view' &&
                    LIST_VIEW_CARD_STYLE.tabBtnActive,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  changeTabs('map-view');
                }}>
                <Text
                  style={[
                    LIST_VIEW_CARD_STYLE.tabBtnLabel,
                    currentTab === 'map-view' &&
                      LIST_VIEW_CARD_STYLE.tabBtnLabelActive,
                  ]}>
                  {buttonLabel?.mapView?.[lang]}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={LIST_VIEW_CARD_STYLE.tabBodyWrap}>
            {currentTab === 'list-view' && (
              <ListingViewScreen
                data={serviceList}
                buttonLabel={buttonLabel?.visit?.[lang]}
                onChange={val => {
                  console.log(val, 'ListingViewTab');
                  setIsButtonLoading(val);
                }}
              />
            )}
            {currentTab === 'map-view' && (
              <MapViewScreen
                data={serviceList}
                pageTitle={pageTitle}
                icons={icons}
                buttonLabel={buttonLabel?.visit?.[lang]}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ServiceListMapScreen;
