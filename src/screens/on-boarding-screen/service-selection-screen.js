import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {getUniqueId} from 'react-native-device-info';

// styles
import {COLORS} from '../../assets/styles/imports/variables';
import {GLOBAL_STYLE} from '../../assets/styles/global-style';
import {ON_BOARDING_STYLE} from '../../assets/styles/screens/on-boarding-style';

// images
import {GLOBAL_IMAGES} from '../../assets/images/global-images';

// components
import {Btn, CheckboxList, Loader} from '../../components/index';

// redux
import {AuthContext} from '../../redux/store';

// navigation
import {useIsFocused} from '@react-navigation/native';
import {getData, storeData} from '../../utils/helper/localStorage';
import NOTIFICATIONS from '../../utils/helper/API/NOTIFICATIONS';

const ServiceSelectionScreen = () => {
  const {loginState, dispatch} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [allServices, setAllServices] = useState([]);
  const [text, setText] = useState({});
  const [loading, setLoading] = useState(true);

  const [apnsToken, setApnsToken] = useState('');

  // Language from redux
  const lang = loginState.language;

  const registerDevice = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission status: ', authStatus);
    }
  };

  useEffect(() => {
    registerDevice();

    getData('settings')
      .then(res => {
        const userOptions = res.userOption;
        let tempArr = userOptions.map(item => {
          return {...item, isSelected: false};
        });
        setAllServices(tempArr);
        setText(res.commonText);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  // Data required to register device token
  const registerTokenData = async list => {
    const devicePlatform = Platform.OS;

    // Device Unique Id
    const deviceUniqueId = await getUniqueId();

    // Device token (FCM/APN)
    const deviceToken =
      Platform.OS === 'android' ? await messaging().getToken() : loginState.apnsToken;

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

    // Register device token
    NOTIFICATIONS.REGISTER_DEVICE_TOKEN(reqData)
      .then(res => console.log('DEVICE REGISTERED: ', res.data))
      .catch(error => {
        console.log('Error : ', error);
      });

    console.log(deviceToken, devicePlatform, tempArr, deviceUniqueId);
  };

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
      <View style={[ON_BOARDING_STYLE.logoWrap]}>
        <Image
          source={GLOBAL_IMAGES.logo}
          style={[ON_BOARDING_STYLE.logoImg]}
        />
      </View>
      <View style={[ON_BOARDING_STYLE.titleWrap]}>
        <Text style={[ON_BOARDING_STYLE.headline]}>
          {text?.introduction?.[lang]}
        </Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <View style={[GLOBAL_STYLE.container]}>
          <View style={[ON_BOARDING_STYLE.listWrap]}>
            {loading ? (
              <Loader bgColor={COLORS.tertiaryColor} />
            ) : (
              <CheckboxList
                data={allServices}
                onChange={(value, _dataArr) => {
                  console.log(_dataArr);
                  setAllServices(_dataArr);
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={[ON_BOARDING_STYLE.btnWrap]}>
        <Btn
          disabled={checkForSelectedOptions(allServices)}
          label={text?.continue?.[lang]}
          mode="outlined"
          color={COLORS.secondaryColor}
          size="medium"
          style={ON_BOARDING_STYLE.btn}
          onPress={() => {
            // store selected services in async-storage
            storeData('selected_services', allServices).then(res => {
              // dispatch register action
              dispatch({
                type: 'REGISTER',
                language: loginState.language,
                notifications: allServices,
              });
            });

            // Register device token
            registerTokenData(allServices);
          }}
          contentStyle={{marginRight: -6, marginLeft: -12}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ServiceSelectionScreen;
