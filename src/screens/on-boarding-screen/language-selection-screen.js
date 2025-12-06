import React, {Component, useState, useContext, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useTranslation} from 'react-i18next';

// styles
import {COLORS} from '../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../assets/styles/global-style';
import {ON_BOARDING_STYLE} from '../../assets/styles/screens/on-boarding-style';

// images
import {GLOBAL_IMAGES} from '../../assets/images/global-images';

// components
import {Btn, RadioList, Loader} from '../../components/index';

// navigation
import NavigationService from '../../navigation/navigation-service';

// redux
import {AuthContext} from '../../redux/store';

// navigation
import {useIsFocused} from '@react-navigation/native';
import {getData, storeData} from '../../utils/helper/localStorage';

const LanguageSelectionScreen = () => {
  const isFocused = useIsFocused();
  const {t, i18n} = useTranslation();

  const [language, setLanguage] = useState([]);
  const [loading, setLoading] = useState(true);

  const {dispatch} = useContext(AuthContext);
  const {loginState} = useContext(AuthContext);

  const [selectedLanguage, setSelectedLanguage] = useState('');

  const fetchData = async () => {
    try {
      const res = await getData('settings');
      const data = res.languageOption;
      if (data != null) {
        const tempArr = data.map(item => {
          if (item.name === 'en') {
            return {...item, isSelected: true};
          }
          return {...item, isSelected: false};
        });
        setLanguage(tempArr);
        storeData('languages', tempArr);
        setSelectedLanguage(tempArr[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginState.setLang) {
      fetchData();
      setLoading(false);
    }
  }, [loginState.setLang]);

  return (
    <SafeAreaView
      style={[GLOBAL_STYLE.safeAreaView, ON_BOARDING_STYLE.bgColor]}>
      {isFocused && (
        <View
          style={{
            backgroundColor: COLORS.tertiaryColor,
            height: StatusBar.currentHeight,
          }}>
          <SafeAreaView>
            <StatusBar
              translucent
              backgroundColor={COLORS.tertiaryColor}
              barStyle={'dark-content'}
            />
          </SafeAreaView>
        </View>
      )}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <View style={[GLOBAL_STYLE.container]}>
          <View style={[ON_BOARDING_STYLE.logoWrap]}>
            <Image
              source={GLOBAL_IMAGES.logo}
              style={[ON_BOARDING_STYLE.logoImg]}
            />
          </View>
          <View style={[ON_BOARDING_STYLE.titleWrap]}>
            <Text style={[ON_BOARDING_STYLE.headline]}>
              Please Select the Language
            </Text>
          </View>
          <View style={[ON_BOARDING_STYLE.listWrap]}>
            {loading ? (
              <View style={[ON_BOARDING_STYLE.loaderWrap]}>
                <Loader bgColor={COLORS.tertiaryColor} />
              </View>
            ) : (
              language.length != 0 && (
                <React.Fragment>
                  <RadioList
                    data={language}
                    onChange={(value, event, _dataArr) => {
                      console.log('====================================');
                      console.log(value);
                      console.log('====================================');
                      setLanguage(_dataArr);
                      setSelectedLanguage(value);
                    }}
                  />
                  <View style={[ON_BOARDING_STYLE.btnWrap]}>
                    <Btn
                      label="Continue"
                      mode="outlined"
                      color={COLORS.secondaryColor}
                      size="medium"
                      style={ON_BOARDING_STYLE.btn}
                      onPress={() => {
                        i18n.changeLanguage(selectedLanguage);
                        storeData('selected_language', selectedLanguage)
                          .then(res => {
                            dispatch({
                              type: 'REGISTER',
                              language: selectedLanguage,
                              notifications: loginState.notifications,
                            });

                            NavigationService.navigate('service-selection');
                          })
                          .catch(error => console.log(error));
                      }}
                      contentStyle={{marginRight: -6, marginLeft: -12}}
                    />
                  </View>
                </React.Fragment>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguageSelectionScreen;
