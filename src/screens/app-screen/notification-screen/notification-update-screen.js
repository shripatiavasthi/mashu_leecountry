import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import messaging from '@react-native-firebase/messaging'; // Sirf yehi rakho
import { getUniqueId } from 'react-native-device-info';

// styles
import { COLORS } from '../../../assets/styles/imports/variables';
import { GLOBAL_STYLE } from '../../../assets/styles/global-style';
import { ON_BOARDING_STYLE } from '../../../assets/styles/screens/on-boarding-style';

// components
import { Btn, CheckboxList, NavHeader } from '../../../components/index';

// navigation
import { useNavigation } from '@react-navigation/native';

// utils
import { getData, storeData } from '../../../utils/helper/localStorage';

// redux
import { AuthContext } from '../../../redux/store';

// API (assuming you have this imported somewhere)
import { NOTIFICATIONS } from '../../../api'; // Adjust path if needed

const NotificationUpdateScreen = () => {
  const { t } = useTranslation();
  const { loginState } = useContext(AuthContext);
  const navigation = useNavigation();

  const [allServices, setAllServices] = useState([]);
  const [text, setText] = useState({});
  const [deviceToken, setDeviceToken] = useState('');

  const lang = loginState.language;

  useEffect(() => {
    // Load selected services
    getData('selected_services')
      .then(res => {
        setAllServices(res || []);
      })
      .catch(err => console.log('Error loading selected_services:', err));

    // Load common text
    getData('settings')
      .then(res => {
        setText(res?.commonText || {});
      })
      .catch(err => console.log('Error loading settings:', err));

    // Get Firebase token (works on both Android & iOS)
    const fetchToken = async () => {
      try {
        const token = await messaging().getToken();
        if (token) {
          setDeviceToken(token);
          console.log('FCM Token:', token);
          // Optional: Save token locally if needed later
          await storeData('fcmToken', token);
        }
      } catch (error) {
        console.log('Error fetching FCM token:', error);
      }
    };

    fetchToken();
  }, []);

  // Check if no option is selected (to disable button)
  const checkForSelectedOptions = arr => {
    return arr.every(item => !item.isSelected || item.name === 'all');
  };

  // Register device token with selected preferences
  const registerTokenData = async list => {
    if (!deviceToken) {
      console.log('Device token not available yet');
      return;
    }

    try {
      const devicePlatform = Platform.OS;
      const deviceUniqueId = await getUniqueId();

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
      console.log('🚀 Notification preference updated successfully');
    } catch (error) {
      console.log('Error updating notification preferences:', error);
    }
  };

  const handleUpdate = async () => {
    await storeData('selected_services', allServices);
    await registerTokenData(allServices);
    navigation.navigate('notifications');
  };

  return (
    <>
      <NavHeader
        title={t('Notification Update')}
        statusBg={COLORS.primaryColor}
        barStyle={'light-content'}
      />
      <SafeAreaView style={[GLOBAL_STYLE.safeAreaView, GLOBAL_STYLE.bgGreyColor]}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={[GLOBAL_STYLE.container]}>
            <View style={[ON_BOARDING_STYLE.titleWrap]}>
              <Text style={[ON_BOARDING_STYLE.headline, { paddingTop: 32 }]}>
                {text?.introduction?.[lang] || ''}
              </Text>
            </View>

            <View style={[ON_BOARDING_STYLE.listWrap]}>
              <CheckboxList
                data={allServices}
                onChange={(value, updatedData) => {
                  setAllServices(updatedData);
                }}
              />
            </View>

            <View style={[ON_BOARDING_STYLE.btnWrap]}>
              <Btn
                disabled={checkForSelectedOptions(allServices)}
                label={text?.update?.[lang] || 'Update'}
                mode="outlined"
                color={COLORS.secondaryColor}
                size="medium"
                style={ON_BOARDING_STYLE.btn}
                onPress={handleUpdate}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default NotificationUpdateScreen;