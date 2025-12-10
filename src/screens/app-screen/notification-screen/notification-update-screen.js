import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getUniqueId} from 'react-native-device-info';

// styles
import {COLORS} from '../../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../../assets/styles/global-style';
import {ON_BOARDING_STYLE} from '../../../assets/styles/screens/on-boarding-style';

// components
import {Btn, CheckboxList, NavHeader} from '../../../components/index';

// navigation
import {useNavigation} from '@react-navigation/native';
import {getData, storeData} from '../../../utils/helper/localStorage';
import NOTIFICATIONS from '../../../utils/helper/API/NOTIFICATIONS';

// redux
import {AuthContext} from '../../../redux/store';

const NotificationUpdateScreen = props => {
  const {t} = useTranslation();
  const {loginState} = useContext(AuthContext);
  const navigation = useNavigation();

  const [allServices, setAllServices] = useState([]);
  const [text, setText] = useState({});

  const [apnsToken, setApnsToken] = useState('');

  // Language from redux
  const lang = loginState.language;

  useEffect(() => {
    // Get selected services from service selection screen
    getData('selected_services')
      .then(res => {
        setAllServices(res);
      })
      .catch(error => console.log(error));

    // Get settings data
    getData('settings')
      .then(res => {
        let _data = res.commonText;
        setText(_data);
      })
      .catch(err => console.log(err));

    getData('apnsToken')
      .then(res => {
        setApnsToken(res);
      })
      .catch(err => console.log(err));
  }, [props]);

  // Function to check if option is selected or not
  const checkForSelectedOptions = arr => {
    return arr.every(item => {
      if (item.isSelected && item.name === 'all') {
        return false;
      } else if (item.isSelected) {
        return false;
      } else {
        return true;
      }
    });
  };

  const registerTokenData = async list => {
    const devicePlatform = Platform.OS;
    const deviceUniqueId = await getUniqueId();
    const deviceToken = apnsToken || '';

    let tempArr = [];

    list.map((item, index) => {
      item.isSelected && tempArr.push(item.name);
    });

    const reqData = {
      platform: devicePlatform,
      token: deviceToken,
      deviceId: deviceUniqueId,
      userOption: tempArr,
    };

    NOTIFICATIONS.REGISTER_DEVICE_TOKEN(reqData)
      .then(res => console.log('🚀 Notification preference updated'))
      .catch(error => {
        console.log('Error : ', error);
      });

    console.log(deviceToken, devicePlatform, tempArr, deviceUniqueId);
  };

  return (
    <React.Fragment>
      <NavHeader
        title={t('Notification Update')}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={[GLOBAL_STYLE.container]}>
            <View style={[ON_BOARDING_STYLE.titleWrap]}>
              <Text style={[ON_BOARDING_STYLE.headline, {paddingTop: 32}]}>
                {text?.introduction?.[lang]}
              </Text>
            </View>
            <View style={[ON_BOARDING_STYLE.listWrap]}>
              <CheckboxList
                data={allServices}
                onChange={(value, _dataArr) => {
                  setAllServices(_dataArr);
                }}
              />
            </View>
            <View style={[ON_BOARDING_STYLE.btnWrap]}>
              <Btn
                disabled={checkForSelectedOptions(allServices)}
                label={text?.update?.[lang]}
                mode="outlined"
                color={COLORS.secondaryColor}
                size="medium"
                style={ON_BOARDING_STYLE.btn}
                onPress={() => {
                  storeData('selected_services', allServices);
                  navigation.navigate('notifications');
                  registerTokenData(allServices);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default NotificationUpdateScreen;
