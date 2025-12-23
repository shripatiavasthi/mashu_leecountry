import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {SvgUri} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {SERVICE_CARD_STYLE} from '../../../assets/styles/screens/card-style';

// components
import {NavHeader, Loader} from '../../../components/index';

// utils
import {getData} from '../../../utils/helper/localStorage';

// redux
import {AuthContext} from '../../../redux/store';
import {CARD_STYLE} from '../../../assets/styles/imports/cards-styles';

const ServiceWebScreen = props => {
  const [serviceList, setServiceList] = useState([]);
  const [pageTitle, setPageTitile] = useState('');
  const [icons, setIcons] = useState({});
  const [buttonLabel, setButtonLabel] = useState({});
  const {loginState} = useContext(AuthContext);
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);

  const lang = loginState.language;

  useEffect(() => {
    let _data = props.route.params;

    setPageTitile(_data.pageTitle);
    let type = _data.type;
    let subCategory = _data.subCategory;
    SERVICE.GET_SERVICE(type, subCategory)
      .then(res => {
        let data = res?.data?.data;
        setServiceList(data?.list);
        setLoading(false);
      })
      .catch(error => console.log(error));

    getData('settings')
      .then(res => {
        setIcons(res.commonIcons);
        setButtonLabel(res?.commonText);
      })
      .catch(error => console.log(error));
  }, [props]);

  const returnIcon = type => {
    if (type === 'link') {
      return {icon: icons.website, label: buttonLabel.visitWebsite[lang]};
    } else {
      return {icon: icons.attachment, label: buttonLabel.viewAttachment[lang]};
    }
  };

  return (
    <React.Fragment>
      <NavHeader
        title={pageTitle}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        {!loading ? (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
            <View
              style={[GLOBAL_STYLE.container, {paddingVertical: 24, flex: 1}]}>
              <View style={SERVICE_CARD_STYLE.externalCardList}>
                {serviceList.length > 0 ? (
                  serviceList?.map((item, index) => {
                    const data =
                      item.mediaType != null && returnIcon(item.mediaType);
                    return (
                      <View
                        key={index}
                        style={SERVICE_CARD_STYLE.externalCardItem}>
                        <Text style={SERVICE_CARD_STYLE.cardLabel}>
                          {item.title[lang]}
                        </Text>
                        {item.description && (
                          <HTMLView
                            value={item.description[lang] ?? ''}
                            stylesheet={{p: {color: COLORS.blackColor}}}
                          />
                        )}
                        {item.mediaType != null && (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            style={SERVICE_CARD_STYLE.cardBtn}
                            onPress={() => {
                              const link =
                                item.mediaType === 'attachment'
                                  ? item.fileUrl
                                  : item.url;
                              Linking.openURL(link);
                            }}>
                            <SvgUri
                              style={{marginLeft: -16, marginHorizontal: 10}}
                              width={25}
                              height={25}
                              color={COLORS.whiteColor}
                              uri={data.icon}
                            />
                            <Text style={SERVICE_CARD_STYLE.cardBtnLabel}>
                              {data.label}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })
                ) : (
                  <View style={[CARD_STYLE.noNotificationContainer]}>
                    <Text style={[CARD_STYLE.eventTitle]}>
                      {t('No Data Available.')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={[SERVICE_CARD_STYLE.loaderWrap]}>
            <Loader bgColor={COLORS.greyColor} />
          </View>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ServiceWebScreen;
