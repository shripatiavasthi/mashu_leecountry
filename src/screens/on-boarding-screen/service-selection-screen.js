import React, { useState, useEffect, useContext } from 'react';
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
import { getUniqueId } from 'react-native-device-info';

// styles
import { COLORS } from '../../assets/styles/imports/variables';
import { GLOBAL_STYLE } from '../../assets/styles/global-style';
import { ON_BOARDING_STYLE } from '../../assets/styles/screens/on-boarding-style';

// images
import { GLOBAL_IMAGES } from '../../assets/images/global-images';

// components
import { Btn, CheckboxList, Loader } from '../../components/index';

// redux
import { AuthContext } from '../../redux/store';

// navigation
import { useIsFocused } from '@react-navigation/native';
import { getData, storeData } from '../../utils/helper/localStorage';
import NOTIFICATIONS from '../../utils/helper/API/NOTIFICATIONS';

const ServiceSelectionScreen = () => {
  const { loginState, dispatch } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [allServices, setAllServices] = useState([]);
  const [text, setText] = useState({});
  const [loading, setLoading] = useState(true);

  const lang = loginState.language;

  useEffect(() => {
    getData('settings')
      .then(res => {
        const userOptions = res.userOption || [];
        let tempArr = userOptions.map(item => ({
          ...item,
          isSelected: false,
        }));
        setAllServices(tempArr);
        setText(res.commonText || {});
        setLoading(false);
      })
      .catch(error => {
        console.log('Error loading settings:', error);
        setLoading(false);
      });
  }, []);

  const registerTokenData = async list => {
    try {
      const devicePlatform = Platform.OS;
      const deviceUniqueId = await getUniqueId();
      const deviceToken = await messaging().getToken();

      let selectedOptions = [];
      list.forEach(item => {
        if (item.isSelected) {
          selectedOptions.push(item.name);
        }
      });

      const reqData = {
        platform: devicePlatform,
        token: deviceToken,
        deviceId: deviceUniqueId,
        userOption: selectedOptions,
      };

      await NOTIFICATIONS.REGISTER_DEVICE_TOKEN(reqData);
      console.log('DEVICE REGISTERED SUCCESSFULLY');
    } catch (error) {
      console.log('Error registering device token:', error);
    }
  };

  const checkForSelectedOptions = arr => {
    return arr.every(item => {
      if (item.name === 'all' && item.isSelected) return false;
      return !item.isSelected;
    });
  };

  const handleContinue = async () => {
    await storeData('selected_services', allServices);
    dispatch({
      type: 'REGISTER',
      language: loginState.language,
      notifications: allServices,
    });
    await registerTokenData(allServices);
  };

  return (
    <SafeAreaView style={[GLOBAL_STYLE.safeAreaView, ON_BOARDING_STYLE.bgColor]}>
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
        <Image source={GLOBAL_IMAGES.logo} style={[ON_BOARDING_STYLE.logoImg]} />
      </View>
      <View style={[ON_BOARDING_STYLE.titleWrap]}>
        <Text style={[ON_BOARDING_STYLE.headline]}>
          {text?.introduction?.[lang] || ''}
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
                onChange={(value, updatedData) => {
                  setAllServices(updatedData);
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={[ON_BOARDING_STYLE.btnWrap]}>
        <Btn
          disabled={checkForSelectedOptions(allServices)}
          label={text?.continue?.[lang] || 'Continue'}
          mode="outlined"
          color={COLORS.secondaryColor}
          size="medium"
          style={ON_BOARDING_STYLE.btn}
          onPress={handleContinue}
          contentStyle={{ marginRight: -6, marginLeft: -12 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ServiceSelectionScreen;